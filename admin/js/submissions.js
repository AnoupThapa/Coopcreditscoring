/**
 * admin/js/submissions.js
 *
 * KEY FIX: mapSubmissionFromGAS now calls runScoringEngine(answers) to rebuild
 * the full result object (categories, strengths, weaknesses, focus, metrics)
 * from the saved Answers JSON — these are never stored in the sheet.
 *
 * Requires admin/js/engine.js to be loaded before this file.
 */

window._adminSubmissions = [];

// ── Fetch from GAS ────────────────────────────────────────────────────────────

async function fetchSubmissions() {
    const url = typeof ADMIN_GAS_URL !== 'undefined' ? ADMIN_GAS_URL : '';
    if (!url) {
        console.warn('ADMIN_GAS_URL not defined — skipping server fetch.');
        return [];
    }

    const tbody = document.getElementById('sub_table_body');
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;padding:40px;">
                    <div style="display:inline-flex;align-items:center;gap:10px;color:var(--ink-5);font-size:13px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                             fill="none" stroke="var(--info,#2563eb)" stroke-width="2"
                             style="animation:spin 1s linear infinite;flex-shrink:0">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Fetching submissions from server…
                    </div>
                </td>
            </tr>`;
        if (!document.getElementById('_spin_style')) {
            const s = document.createElement('style');
            s.id = '_spin_style';
            s.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
            document.head.appendChild(s);
        }
    }

    try {
        const res = await fetch(url + '?action=getSubmissions', { redirect: 'follow' });
        if (!res.ok) throw new Error('HTTP ' + res.status);

        const data = await res.json();
        console.log('[fetchSubmissions] server response:', data);

        if (data && data.error) throw new Error('GAS error: ' + data.error);

        if (data && data.spreadsheetName !== undefined) {
            throw new Error(
                'GAS is still running the OLD deployment. ' +
                'In Apps Script → Deploy → Manage deployments → edit → Version = "New version" → Deploy.'
            );
        }

        if (!Array.isArray(data)) {
            throw new Error('Unexpected response format. Got: ' + JSON.stringify(data).slice(0, 200));
        }

        window._adminSubmissions = data.map(mapSubmissionFromGAS);

        if (typeof loadDashboard === 'function') loadDashboard();
        return window._adminSubmissions;

    } catch (err) {
        console.error('fetchSubmissions error:', err);
        if (typeof showAdminToast === 'function') {
            showAdminToast('Failed to load submissions: ' + err.message, 'error');
        }
        if (tbody) {
            tbody.innerHTML = `
                <tr><td colspan="8">
                    <div class="empty-state">
                        <div class="empty-state-icon"><i data-lucide="wifi-off"></i></div>
                        <h3>Could not load submissions</h3>
                        <p>${err.message}</p>
                    </div>
                </td></tr>`;
            if (window.lucide) lucide.createIcons();
        }
        return [];
    }
}

// ── Map GAS row → submission object ──────────────────────────────────────────

function mapSubmissionFromGAS(raw) {
    // Parse Answers JSON
    const answersStr = raw['Answers JSON'] || '{}';
    const answers = (function () {
        try {
            if (typeof answersStr === 'string' && answersStr.trim().startsWith('{')) {
                return JSON.parse(answersStr);
            }
        } catch (e) { /* fall through */ }
        return {};
    })();

    // Stable synthetic ID from timestamp + coop name
    const tsRaw   = raw['Submission Timestamp'] || raw['Server Timestamp'] || '';
    const coopRaw = raw['Coop Name'] || answers.coop_name || '';
    const syntheticId = (String(tsRaw) + String(coopRaw))
        .replace(/[^a-z0-9]/gi, '').toLowerCase()
        || ('sub_' + Math.random().toString(36).slice(2));

    // Approver status
    let approverStatus = String(raw['Approver Status'] || '').trim().toLowerCase();
    if (!approverStatus) approverStatus = 'pending';

    // Score from sheet
    const score = raw['Total Score'] !== '' && raw['Total Score'] != null
        ? Number(raw['Total Score']) : 0;

    // ── RE-RUN SCORING ENGINE from saved answers ──────────────────────────────
    // Rebuilds: categories, strengths, weaknesses, focus, metrics, data
    // These are computed client-side and never saved to the sheet.
    let result = {};
    if (typeof runScoringEngine === 'function' && answers && Object.keys(answers).length > 0) {
        try {
            result = runScoringEngine(answers);
        } catch (e) {
            console.warn('[mapSubmissionFromGAS] Engine error for "' + coopRaw + '":', e.message);
        }
    } else if (typeof runScoringEngine !== 'function') {
        console.error('[mapSubmissionFromGAS] runScoringEngine not found — is engine.js loaded before submissions.js in admin.html?');
    }

    // Determine modelType from answers
    const modelType = (function () {
        const mt = String(answers.model_type || '').toLowerCase();
        if (mt.includes('processing') || mt.includes('model b')) return 'processing';
        return 'collection';
    })();

    return {
        id:                syntheticId,
        coopName:          raw['Coop Name']            || answers.coop_name || 'Unknown',
        submittedAt:       raw['Submission Timestamp'] || raw['Server Timestamp'] || new Date().toISOString(),
        score:             isNaN(score) ? (result.totalScore || 0) : score,
        riskTier:          raw['Risk Tier']            || result.riskCategory || '—',
        approverStatus:    approverStatus,
        approverNotes:     raw['Approver Notes']       || '',
        approverDecidedAt: raw['Approver Decided At']  || null,
        modelType:         modelType,
        customerType:      answers.customer_type       || 'new',
        answers:           answers,
        result:            result,   // ← now fully populated with categories etc.
        _raw:              raw
    };
}

// ── In-memory accessor ────────────────────────────────────────────────────────

function loadSubmissionsData() {
    return window._adminSubmissions || [];
}

// ── Render table ──────────────────────────────────────────────────────────────

function renderSubmissionsTable(filter, riskFilter) {
    filter     = filter     || '';
    riskFilter = riskFilter || '';

    const all   = loadSubmissionsData();
    const tbody = document.getElementById('sub_table_body');
    const count = document.getElementById('sub_count_badge');
    if (!tbody) return;

    let rows = all.slice().reverse();

    if (filter.trim()) {
        const q = filter.toLowerCase();
        rows = rows.filter(r =>
            (r.coopName || '').toLowerCase().includes(q) ||
            (r.id       || '').toLowerCase().includes(q)
        );
    }

    if (riskFilter && riskFilter !== 'all') {
        rows = rows.filter(r => (r.riskTier || '').toLowerCase().startsWith(riskFilter));
    }

    if (count) count.textContent = all.length;

    if (!rows.length) {
        tbody.innerHTML = `
            <tr><td colspan="8">
                <div class="empty-state">
                    <div class="empty-state-icon"><i data-lucide="inbox"></i></div>
                    <h3>${all.length ? 'No results match your filters' : 'No submissions yet'}</h3>
                    <p>${all.length ? 'Try clearing the search or filter.' : 'Complete the questionnaire in the user portal.'}</p>
                </div>
            </td></tr>`;
        if (window.lucide) lucide.createIcons();
        return;
    }

    tbody.innerHTML = rows.map(function (sub) {
        const tier       = getRiskTierClass(sub.riskTier || '');
        const status     = sub.approverStatus || 'pending';
        const date       = sub.submittedAt
            ? new Date(sub.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            : '—';
        const score      = sub.score != null ? sub.score : '—';
        const scoreColor = getScoreColor(sub.score || 0);
        const shortId    = (sub.id || '').toString().slice(-6);
        const modelLabel = sub.modelType === 'processing' ? 'Processing' : 'Collection';

        return `
            <tr onclick="openSubmission('${sub.id}')">
                <td><span class="sub-id">#${shortId}</span></td>
                <td><span class="sub-coop-name">${_escHtml(sub.coopName || '—')}</span></td>
                <td><span style="font-size:11px;color:var(--ink-5)">${date}</span></td>
                <td>
                    <span class="sub-score" style="color:${scoreColor}">${score}</span>
                    <span style="font-size:10px;color:var(--ink-5)">/1000</span>
                </td>
                <td><span class="risk-pill ${tier}">${_escHtml(sub.riskTier || '—')}</span></td>
                <td>
                    <span class="status-pill ${status}">
                        <span class="status-dot"></span>${_cap(status)}
                    </span>
                </td>
                <td style="font-size:11px;color:var(--ink-5)">${_escHtml(modelLabel)}</td>
                <td>
                    <button class="btn-view" onclick="event.stopPropagation();openSubmission('${sub.id}')">
                        <i data-lucide="eye" style="width:12px;height:12px;stroke-width:2;vertical-align:middle;"></i> View
                    </button>
                </td>
            </tr>`;
    }).join('');

    if (window.lucide) lucide.createIcons();
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRiskTierClass(tier) {
    const t = (tier || '').toLowerCase();
    if (t.startsWith('a')) return 'a';
    if (t.startsWith('b')) return 'b';
    if (t.startsWith('c')) return 'c';
    return 'd';
}

function getScoreColor(score) {
    if (score >= 850) return '#16a34a';
    if (score >= 700) return '#2563eb';
    if (score >= 500) return '#d97706';
    return '#b91c1c';
}

function _cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
function _escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Open submission ───────────────────────────────────────────────────────────

function openSubmission(id) {
    const all = loadSubmissionsData();
    const sub = all.find(function (s) {
        return s.id === id || String(s.id) === String(id);
    });
    if (!sub) {
        if (typeof showAdminToast === 'function') showAdminToast('Submission not found.', 'error');
        return;
    }
    window._adminCurrentSubmission = sub;
    navigateAdmin('result');
    renderResultViewer(sub);
    renderApproverPanel(sub);
}

// ── Init submissions view ─────────────────────────────────────────────────────

function initSubmissionsView() {
    renderSubmissionsTable();

    const searchInput = document.getElementById('sub_search');
    const riskSelect  = document.getElementById('sub_risk_filter');

    if (searchInput) {
        const newSearch = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearch, searchInput);
        newSearch.addEventListener('input', function () {
            renderSubmissionsTable(newSearch.value, riskSelect ? riskSelect.value : '');
        });
    }

    if (riskSelect) {
        const newSelect = riskSelect.cloneNode(true);
        riskSelect.parentNode.replaceChild(newSelect, riskSelect);
        newSelect.addEventListener('change', function () {
            const search = document.getElementById('sub_search');
            renderSubmissionsTable(search ? search.value : '', newSelect.value);
        });
    }
}