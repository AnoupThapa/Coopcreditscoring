/**
 * scoringEngine.js — Pipeline Orchestrator + Shared Utilities
 *
 * Orchestrates the full local scoring pipeline:
 *   Raw Inputs → transformData() → runCalculations() → runModel() → Result
 *
 * Also contains shared utility functions used across all pipeline layers.
 *
 * Load order in HTML:
 *   1. scoringEngine.js   (utilities + orchestrator)
 *   2. dataTransform.js   (Data Sheet layer)
 *   3. calculations.js    (Calculations Sheet layer)
 *   4. model.js           (Model Sheet layer)
 */

// ═══════════════════════════════════════════════════════════════════════════
// Shared Utility Functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Parse a value to a safe finite number. Returns 0 if NaN/null/undefined.
 * @param {*} v
 * @returns {number}
 */
function safeNum(v) {
    const n = Number(v);
    return (Number.isFinite(n) ? n : 0);
}

/**
 * Safe division — returns 0 if denominator is 0 or non-finite.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function safeDivide(a, b) {
    return (b && Number.isFinite(b) && b !== 0) ? a / b : 0;
}

/**
 * Clamp a value between lo and hi (inclusive).
 * @param {number} v
 * @param {number} lo
 * @param {number} hi
 * @returns {number}
 */
function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}

/**
 * Format a number with locale commas.
 * @param {number} n
 * @returns {string}
 */
function fmtNum(n) {
    return Number(n).toLocaleString('en-IN');
}

/**
 * Format a Nepali Rupee amount into a human-readable string.
 * @param {number} val - Amount in NPR
 * @returns {string}
 */
function fmtNPR(val) {
    const n = Number(val);
    if (!val || isNaN(n) || n === 0) return 'NPR 0';
    if (n >= 1e7)  return 'NPR ' + (n / 1e7).toFixed(2)  + ' Cr';
    if (n >= 1e5)  return 'NPR ' + (n / 1e5).toFixed(2)  + ' L';
    return 'NPR ' + n.toLocaleString('en-IN');
}

// ═══════════════════════════════════════════════════════════════════════════
// Form Auto-Calculation Trigger Functions
// Called by oninput handlers defined in questions.js
// ═══════════════════════════════════════════════════════════════════════════

/** S.N 8: Total Loan = existing_loan_amt + proposed_loan_amt */
function calculateTotalLoan() {
    const el = document.getElementById('total_loan');
    if (!el) return;
    el.value = safeNum(document.getElementById('existing_loan_amt')?.value) +
               safeNum(document.getElementById('proposed_loan_amt')?.value);
}

/** S.N 15, 17: Total Sales and Total Revenue */
function calculateRevenue() {
    const milk    = safeNum(document.getElementById('milk_sales')?.value);
    const product = safeNum(document.getElementById('product_sales')?.value);
    const other   = safeNum(document.getElementById('other_sales')?.value);
    const grant   = safeNum(document.getElementById('grant_income')?.value);

    const totalSales = milk + product + other;
    const el15 = document.getElementById('total_sales');
    if (el15) el15.value = totalSales;

    const el17 = document.getElementById('total_revenue');
    if (el17) el17.value = totalSales + grant;
}

/** S.N 30–31: Top 5 buyer % and largest buyer % */
function calculateBuyerShares() {
    const totalSales  = safeNum(document.getElementById('total_sales')?.value)
        || (safeNum(document.getElementById('milk_sales')?.value)
          + safeNum(document.getElementById('product_sales')?.value)
          + safeNum(document.getElementById('other_sales')?.value));
    const top5        = safeNum(document.getElementById('top5_buyers_sales')?.value);
    const largest     = safeNum(document.getElementById('largest_buyer_sales')?.value);

    const el30 = document.getElementById('top5_buyer_share_percent');
    if (el30) el30.value = totalSales > 0 ? ((top5 / totalSales) * 100).toFixed(4) : 0;

    const el31 = document.getElementById('largest_buyer_share_percent');
    if (el31) el31.value = totalSales > 0 ? ((largest / totalSales) * 100).toFixed(4) : 0;
}

/** S.N 44: Total operating expenses */
function calculateExpenses() {
    const ids = [
        'raw_milk_purchase_cost', 'processing_cost', 'packaging_cost', 'transport_cost',
        'other_processing_cost', 'salary_expense', 'admin_expense', 'electricity_expense',
        'fuel_expense', 'maintenance_expense', 'rent_expense', 'other_operating_expense'
    ];
    const total = ids.reduce((sum, id) => sum + safeNum(document.getElementById(id)?.value), 0);
    const el = document.getElementById('total_opex');
    if (el) el.value = total;
}

/** S.N 50: Total cash */
function calculateAssets() {
    // Total cash (S.N 50)
    const cashHand   = safeNum(document.getElementById('cash_on_hand')?.value);
    const bankBal    = safeNum(document.getElementById('bank_balance')?.value);
    const totalCash  = cashHand + bankBal;
    const elCash     = document.getElementById('total_cash');
    if (elCash) elCash.value = totalCash;

    // Total current assets (S.N 55)
    const ar      = safeNum(document.getElementById('accounts_receivable')?.value);
    const inv     = safeNum(document.getElementById('inventory')?.value);
    const prepaid = safeNum(document.getElementById('prepaid_expense')?.value);
    const oca     = safeNum(document.getElementById('other_current_assets')?.value);
    const totalCA = totalCash + ar + inv + prepaid + oca;
    const elCA    = document.getElementById('current_assets');
    if (elCA) elCA.value = totalCA;

    // Total fixed assets (S.N 62)
    const fixedIds = ['land_value', 'building_value', 'plant_machinery_value',
                      'vehicle_value', 'furniture_value', 'other_fixed_assets'];
    const totalFA  = fixedIds.reduce((s, id) => s + safeNum(document.getElementById(id)?.value), 0);
    const elFA     = document.getElementById('non_current_assets');
    if (elFA) elFA.value = totalFA;

    // Total assets (S.N 63)
    const elTA = document.getElementById('total_assets');
    if (elTA) elTA.value = totalCA + totalFA;
}

/** S.N 68, 71, 72: Liability totals */
function calculateLiabilities() {
    const ap     = safeNum(document.getElementById('accounts_payable')?.value);
    const stl    = safeNum(document.getElementById('short_term_loan')?.value);
    const acc    = safeNum(document.getElementById('accrued_expense')?.value);
    const cltd   = safeNum(document.getElementById('current_portion_long_term_debt')?.value);
    const totalCL= ap + stl + acc + cltd;
    const elCL   = document.getElementById('current_liabilities');
    if (elCL) elCL.value = totalCL;

    const ltl    = safeNum(document.getElementById('long_term_loan')?.value);
    const oltl   = safeNum(document.getElementById('other_long_term_liabilities')?.value);
    const totalLTL = ltl + oltl;
    const elLTL  = document.getElementById('non_current_liabilities');
    if (elLTL) elLTL.value = totalLTL;

    const elTL   = document.getElementById('total_liabilities');
    if (elTL) elTL.value = totalCL + totalLTL;
}

/** S.N 76: Total net worth */
function calculateNetWorth() {
    const puc  = safeNum(document.getElementById('paid_up_capital')?.value);
    const re   = safeNum(document.getElementById('retained_earnings')?.value);
    const res  = safeNum(document.getElementById('reserves')?.value);
    const el   = document.getElementById('total_networth');
    if (el) el.value = puc + re + res;
}

/** S.N 80, 90: Milk totals */
function calculateMilkMetrics() {
    // S.N 80: Produced milk = collected - collection loss - processing loss
    const collected  = safeNum(document.getElementById('total_milk_collected_liters')?.value);
    const collLoss   = safeNum(document.getElementById('milk_loss_liters_during_collection')?.value);
    const procLoss   = safeNum(document.getElementById('loss_during_process')?.value);
    const produced   = Math.max(0, collected - collLoss - procLoss);
    const el80       = document.getElementById('produced_milk_model_b_liters');
    if (el80) el80.value = produced;

    // S.N 90: Average milk per farmer
    const farmers    = safeNum(document.getElementById('total_number_of_farmers')?.value);
    const el90       = document.getElementById('avg_farmer_quantity_liters');
    if (el90) el90.value = farmers > 0 ? (collected / farmers).toFixed(2) : 0;
}

// ═══════════════════════════════════════════════════════════════════════════
// Pipeline Orchestrator
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Run the complete credit scoring pipeline locally in the browser.
 * @param {Object} formInputs - Flat key-value object from form DOM (id → value)
 * @returns {Object}          - Complete result object for the UI
 */
function runScoringEngine(formInputs) {
    const startTime = performance.now();

    if (typeof transformData   !== 'function') throw new Error('scoringEngine: dataTransform.js not loaded');
    if (typeof runCalculations !== 'function') throw new Error('scoringEngine: calculations.js not loaded');
    if (typeof runModel        !== 'function') throw new Error('scoringEngine: model.js not loaded');

    // Step 1: Data Sheet — normalize and derive all computed fields
    const data = transformData(formInputs);

    // Step 2: Calculations Sheet — compute all financial ratios and metrics
    const calc = runCalculations(data);

    // Step 3: Model Sheet — apply scoring rules and produce result
    const result = runModel(calc, data);

    const elapsed = Math.round(performance.now() - startTime);
    console.info(`[ScoringEngine] Complete in ${elapsed}ms | Score: ${result.totalScore}/1000 (${result.riskCategory})`);

    result._meta = {
        elapsedMs: elapsed,
        timestamp: new Date().toISOString()
    };

    return result;
}

/**
 * Collect all current form values from the DOM into a flat object.
 * Reads all input, select, and textarea elements that have IDs.
 * @returns {Object} - Flat key-value map { fieldId: value }
 */
function collectFormInputs() {
    const inputs = {};
    document.querySelectorAll('input[id], select[id], textarea[id]').forEach(el => {
        if (!el.id) return;
        inputs[el.id] = el.type === 'number'
            ? (parseFloat(el.value) || 0)
            : (el.value || '');
    });
    return inputs;
}