/**
 * devtools.js — Quick-Fill Test Data Panel
 *
 * 4 presets, one per config combination:
 *   1. Collection Only    × New Customer      (A Risk ~880pts)
 *   2. Collection Only    × Existing Customer (B Risk ~720pts)
 *   3. Coll. & Processing × New Customer      (C Risk ~540pts)
 *   4. Coll. & Processing × Existing Customer (D Risk ~290pts)
 *
 * fillTestData():
 *   1. Calls setCoopType() + setCustomerType() to configure the app state
 *   2. Calls navigateTo('questions') to render the questionnaire
 *   3. Waits (polls) until the DOM has inputs
 *   4. Sets every field value + fires input/change events
 *   5. Calls all calculateXxx() auto-calc functions
 */

const TEST_PRESETS = {

    // ══════════════════════════════════════════════════════════════════════════
    // PRESET 1 — Collection Only × New Customer  →  A Risk ~880pts
    // ══════════════════════════════════════════════════════════════════════════
    col_new: {
        _label:        'Collection Only — New Customer',
        _sublabel:     'A Risk ~880pts',
        _color:        '#16a34a',
        _modelType:    'collection',
        _customerType: 'new',

        coop_name:                          'Himalayan Dairy Cooperative (Test)',
        years_operation:                    15,
        office_location:                    'Lalitpur, Bagmati',

        existing_loan_amt:                  0,
        proposed_loan_amt:                  3000000,
        interest_rate:                      9,
        loan_tenure_months:                 60,
        repayment_frequency:                'Monthly',

        milk_sales:                         42000000,
        product_sales:                      3000000,
        other_sales:                        500000,
        grant_income:                       200000,
        bank_sales:                         38000000,

        total_number_of_buyers:             500,
        top5_buyers_sales:                  10000000,
        largest_buyer_sales:                2500000,
        gov_buyer_sales:                    8000000,
        no_govt_buyers:                     3,
        large_private_buyer_sales:          20000000,
        no_private_sector_buyer:            5,
        small_buyer_sales:                  500000,
        no_small_buyer_sales:               10,
        avg_payment_days_buyers:            20,
        contract_coverage:                  8,

        raw_milk_purchase_cost:             28000000,
        transport_cost:                     600000,
        salary_expense:                     2000000,
        admin_expense:                      500000,
        electricity_expense:                300000,
        fuel_expense:                       200000,
        maintenance_expense:                150000,
        rent_expense:                       100000,
        other_operating_expense:            200000,
        depreciation:                       800000,
        amortization:                       100000,

        cash_on_hand:                       500000,
        bank_balance:                       5000000,
        accounts_receivable:                800000,
        inventory:                          600000,
        prepaid_expense:                    100000,
        other_current_assets:               200000,
        land_value:                         8000000,
        building_value:                     3000000,
        plant_machinery_value:              2500000,
        vehicle_value:                      1500000,
        furniture_value:                    300000,
        other_fixed_assets:                 200000,

        accounts_payable:                   300000,
        short_term_loan:                    0,
        accrued_expense:                    100000,
        current_portion_long_term_debt:     600000,
        long_term_loan:                     2400000,
        other_long_term_liabilities:        0,

        paid_up_capital:                    5000000,
        retained_earnings:                  4000000,
        reserves:                           2000000,

        total_milk_collected_liters:        4200000,
        milk_loss_liters_during_collection: 42000,
        loss_during_process:                0,
        avg_monthly_milk_liters:            350000,
        lowest_monthly_milk_liters:         310000,
        highest_monthly_milk_liters:        420000,
        average_inventory:                  400000,
        credit_period_given_days:           7,
        top5_farmer_collection_liters:      500000,
        highest_farmer_quantity_liters:     90000,
        lowest_farmer_quantity_liters:      1000,
        total_number_of_farmers:            700,
        collection_days_positive:           355,

        total_member_loans:                 8000000,
        npa_member_loans:                   80000,
        overdue_member_loans:               120000,
        restructured_loans_past3yrs:        'None',
        max_dpd_days:                       10,
        credit_history_flag:                'Timely',

        cash_bank_balance_last_year:        5500000,
        cash_bank_balance_previous_year:    4200000,
        audit_findings_count:               'None',

        key_mgmt_avg_experience_years:      12,
        internal_control_score:             '85',
        lending_policy_compliance_flag:     'Yes',
        fleet_availability_percent:         'Yes',

        storage_availability_flag:          'Yes',
        quality_sop_score_model_b:          'Standards and documents exist. मापदण्ड र दस्तावेज छन्',
        insurance_coverage_flag:            'Yes',
        digital_mis_flag:                   'Yes',
        regulatory_compliance_flag:         'Full',
        climatic_risk_score:                '2',

        credit_history_banks:               'Pass',
        dpd_days_banks:                     0,

        meeting_frequency:                  'Weekly',
        member_info_transparency:           'Always',
        fund_usage:                         'Buying Milk',
        kyc_aml:                            'Easily Found',
        income_expense_checked:             'Regularly',
        right_to_information:               'Always Beforehand',
        community_support_level:            'Frequently',
        emergency_response:                 'Proper Plan'
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PRESET 2 — Collection Only × Existing Customer  →  B Risk ~720pts
    // ══════════════════════════════════════════════════════════════════════════
    col_existing: {
        _label:        'Collection Only — Existing Customer',
        _sublabel:     'B Risk ~720pts',
        _color:        '#2563eb',
        _modelType:    'collection',
        _customerType: 'existing',

        coop_name:                          'Terai Milk Cooperative (Test)',
        years_operation:                    8,
        office_location:                    'Chitwan, Bagmati',

        existing_loan_amt:                  500000,
        proposed_loan_amt:                  4000000,
        interest_rate:                      10,
        loan_tenure_months:                 60,
        repayment_frequency:                'Monthly',

        milk_sales:                         30000000,
        product_sales:                      1500000,
        other_sales:                        300000,
        grant_income:                       800000,
        bank_sales:                         22000000,

        total_number_of_buyers:             300,
        top5_buyers_sales:                  12000000,
        largest_buyer_sales:                4000000,
        gov_buyer_sales:                    5000000,
        no_govt_buyers:                     2,
        large_private_buyer_sales:          15000000,
        no_private_sector_buyer:            4,
        small_buyer_sales:                  800000,
        no_small_buyer_sales:               8,
        avg_payment_days_buyers:            35,
        contract_coverage:                  5,

        raw_milk_purchase_cost:             20000000,
        transport_cost:                     500000,
        salary_expense:                     1500000,
        admin_expense:                      400000,
        electricity_expense:                250000,
        fuel_expense:                       180000,
        maintenance_expense:                120000,
        rent_expense:                       100000,
        other_operating_expense:            300000,
        depreciation:                       600000,
        amortization:                       50000,

        cash_on_hand:                       300000,
        bank_balance:                       2900000,
        accounts_receivable:                1000000,
        inventory:                          400000,
        prepaid_expense:                    80000,
        other_current_assets:               150000,
        land_value:                         6000000,
        building_value:                     2000000,
        plant_machinery_value:              1500000,
        vehicle_value:                      1200000,
        furniture_value:                    200000,
        other_fixed_assets:                 150000,

        accounts_payable:                   500000,
        short_term_loan:                    500000,
        accrued_expense:                    150000,
        current_portion_long_term_debt:     800000,
        long_term_loan:                     3200000,
        other_long_term_liabilities:        0,

        paid_up_capital:                    3000000,
        retained_earnings:                  2000000,
        reserves:                           1000000,

        total_milk_collected_liters:        2800000,
        milk_loss_liters_during_collection: 70000,
        loss_during_process:                0,
        avg_monthly_milk_liters:            233000,
        lowest_monthly_milk_liters:         180000,
        highest_monthly_milk_liters:        290000,
        average_inventory:                  300000,
        credit_period_given_days:           10,
        top5_farmer_collection_liters:      560000,
        highest_farmer_quantity_liters:     70000,
        lowest_farmer_quantity_liters:      800,
        total_number_of_farmers:            450,
        collection_days_positive:           340,

        total_member_loans:                 5000000,
        npa_member_loans:                   150000,
        overdue_member_loans:               200000,
        restructured_loans_past3yrs:        'Few Times',
        max_dpd_days:                       35,
        credit_history_flag:                'With few delays',

        cash_bank_balance_last_year:        3200000,
        cash_bank_balance_previous_year:    2800000,
        audit_findings_count:               'Few',

        key_mgmt_avg_experience_years:      7,
        internal_control_score:             '65',
        lending_policy_compliance_flag:     'Yes',
        fleet_availability_percent:         'Yes',

        storage_availability_flag:          'Yes',
        quality_sop_score_model_b:          'Standards exist, no documents मापदण्ड छन्, दस्तावेज छैन',
        insurance_coverage_flag:            'Yes',
        digital_mis_flag:                   'Partial',
        regulatory_compliance_flag:         'Partial',
        climatic_risk_score:                '5',

        credit_history_banks:               'Pass',
        dpd_days_banks:                     0,

        meeting_frequency:                  'Monthly',
        member_info_transparency:           'Mostly',
        fund_usage:                         'Buying Milk',
        kyc_aml:                            'Mostly',
        income_expense_checked:             'Regularly',
        right_to_information:               'Mostly Beforehand',
        community_support_level:            'Sometimes',
        emergency_response:                 'Little Preparation'
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PRESET 3 — Collection & Processing × New Customer  →  C Risk ~540pts
    // ══════════════════════════════════════════════════════════════════════════
    proc_new: {
        _label:        'Coll. & Processing — New Customer',
        _sublabel:     'C Risk ~540pts',
        _color:        '#d97706',
        _modelType:    'processing',
        _customerType: 'new',

        coop_name:                          'Koshi Valley Cooperative (Test)',
        years_operation:                    4,
        office_location:                    'Morang, Koshi',

        existing_loan_amt:                  1500000,
        proposed_loan_amt:                  5000000,
        interest_rate:                      12,
        loan_tenure_months:                 48,
        repayment_frequency:                'Quarterly',

        milk_sales:                         18000000,
        product_sales:                      500000,
        other_sales:                        200000,
        grant_income:                       2500000,
        bank_sales:                         9000000,

        total_number_of_buyers:             150,
        top5_buyers_sales:                  10000000,
        largest_buyer_sales:                5000000,
        gov_buyer_sales:                    2000000,
        no_govt_buyers:                     1,
        large_private_buyer_sales:          8000000,
        no_private_sector_buyer:            3,
        small_buyer_sales:                  1000000,
        no_small_buyer_sales:               15,
        avg_payment_days_buyers:            55,
        contract_coverage:                  2,

        raw_milk_purchase_cost:             13000000,
        processing_cost:                    1200000,
        packaging_cost:                     600000,
        other_processing_cost:              300000,
        transport_cost:                     400000,
        salary_expense:                     1200000,
        admin_expense:                      350000,
        electricity_expense:                200000,
        fuel_expense:                       150000,
        maintenance_expense:                100000,
        rent_expense:                       80000,
        other_operating_expense:            250000,
        depreciation:                       400000,
        amortization:                       30000,

        cash_on_hand:                       200000,
        bank_balance:                       1300000,
        accounts_receivable:                1500000,
        inventory:                          300000,
        prepaid_expense:                    50000,
        other_current_assets:               100000,
        land_value:                         4000000,
        building_value:                     1200000,
        plant_machinery_value:              800000,
        vehicle_value:                      600000,
        furniture_value:                    150000,
        other_fixed_assets:                 100000,

        accounts_payable:                   800000,
        short_term_loan:                    1500000,
        accrued_expense:                    300000,
        current_portion_long_term_debt:     1000000,
        long_term_loan:                     4000000,
        other_long_term_liabilities:        500000,

        paid_up_capital:                    1500000,
        retained_earnings:                  500000,
        reserves:                           300000,

        total_milk_collected_liters:        1600000,
        milk_loss_liters_during_collection: 48000,
        loss_during_process:                32000,
        avg_monthly_milk_liters:            133000,
        lowest_monthly_milk_liters:         80000,
        highest_monthly_milk_liters:        180000,
        average_inventory:                  200000,
        credit_period_given_days:           21,
        top5_farmer_collection_liters:      640000,
        highest_farmer_quantity_liters:     50000,
        lowest_farmer_quantity_liters:      500,
        total_number_of_farmers:            280,
        collection_days_positive:           310,

        total_member_loans:                 3500000,
        npa_member_loans:                   280000,
        overdue_member_loans:               400000,
        restructured_loans_past3yrs:        'Few Times',
        max_dpd_days:                       65,
        credit_history_flag:                'With few delays',

        cash_bank_balance_last_year:        1500000,
        cash_bank_balance_previous_year:    1800000,
        audit_findings_count:               'Few',

        key_mgmt_avg_experience_years:      4,
        internal_control_score:             '20',
        lending_policy_compliance_flag:     'No',
        fleet_availability_percent:         'Yes',

        storage_availability_flag:          'No',
        quality_sop_score_model_b:          'Standards exist, no documents मापदण्ड छन्, दस्तावेज छैन',
        insurance_coverage_flag:            'No',
        digital_mis_flag:                   'Partial',
        regulatory_compliance_flag:         'Partial',
        climatic_risk_score:                '5',

        credit_history_banks:               'Watch List',
        dpd_days_banks:                     10,

        meeting_frequency:                  'Monthly',
        member_info_transparency:           'Sometimes',
        fund_usage:                         'Buying Milk',
        kyc_aml:                            'Sometimes',
        income_expense_checked:             'Occasionally',
        right_to_information:               'Sometimes beforehand',
        community_support_level:            'Sometimes',
        emergency_response:                 'Little Preparation'
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PRESET 4 — Collection & Processing × Existing Customer  →  D Risk ~290pts
    // ══════════════════════════════════════════════════════════════════════════
    proc_existing: {
        _label:        'Coll. & Processing — Existing Customer',
        _sublabel:     'D Risk ~290pts',
        _color:        '#b91c1c',
        _modelType:    'processing',
        _customerType: 'existing',

        coop_name:                          'Failing Test Cooperative (Test)',
        years_operation:                    1,
        office_location:                    'Remote District',

        existing_loan_amt:                  3000000,
        proposed_loan_amt:                  6000000,
        interest_rate:                      16,
        loan_tenure_months:                 36,
        repayment_frequency:                'Annual',

        milk_sales:                         8000000,
        product_sales:                      0,
        other_sales:                        100000,
        grant_income:                       5000000,
        bank_sales:                         2000000,

        total_number_of_buyers:             50,
        top5_buyers_sales:                  6500000,
        largest_buyer_sales:                4000000,
        gov_buyer_sales:                    500000,
        no_govt_buyers:                     1,
        large_private_buyer_sales:          3000000,
        no_private_sector_buyer:            2,
        small_buyer_sales:                  2000000,
        no_small_buyer_sales:               20,
        avg_payment_days_buyers:            90,
        contract_coverage:                  0,

        raw_milk_purchase_cost:             7000000,
        processing_cost:                    400000,
        packaging_cost:                     200000,
        other_processing_cost:              100000,
        transport_cost:                     300000,
        salary_expense:                     900000,
        admin_expense:                      300000,
        electricity_expense:                150000,
        fuel_expense:                       120000,
        maintenance_expense:                80000,
        rent_expense:                       60000,
        other_operating_expense:            200000,
        depreciation:                       200000,
        amortization:                       0,

        cash_on_hand:                       50000,
        bank_balance:                       350000,
        accounts_receivable:                2500000,
        inventory:                          150000,
        prepaid_expense:                    0,
        other_current_assets:               50000,
        land_value:                         1800000,
        building_value:                     600000,
        plant_machinery_value:              400000,
        vehicle_value:                      300000,
        furniture_value:                    80000,
        other_fixed_assets:                 50000,

        accounts_payable:                   1500000,
        short_term_loan:                    3000000,
        accrued_expense:                    600000,
        current_portion_long_term_debt:     1200000,
        long_term_loan:                     4800000,
        other_long_term_liabilities:        1000000,

        paid_up_capital:                    500000,
        retained_earnings:                  -200000,
        reserves:                           100000,

        total_milk_collected_liters:        700000,
        milk_loss_liters_during_collection: 42000,
        loss_during_process:                28000,
        avg_monthly_milk_liters:            58000,
        lowest_monthly_milk_liters:         20000,
        highest_monthly_milk_liters:        90000,
        average_inventory:                  100000,
        credit_period_given_days:           45,
        top5_farmer_collection_liters:      420000,
        highest_farmer_quantity_liters:     30000,
        lowest_farmer_quantity_liters:      200,
        total_number_of_farmers:            90,
        collection_days_positive:           260,

        total_member_loans:                 2000000,
        npa_member_loans:                   600000,
        overdue_member_loans:               800000,
        restructured_loans_past3yrs:        'Frequently',
        max_dpd_days:                       120,
        credit_history_flag:                'Frequent delays',

        cash_bank_balance_last_year:        400000,
        cash_bank_balance_previous_year:    700000,
        audit_findings_count:               'Qualified',

        key_mgmt_avg_experience_years:      1,
        internal_control_score:             '20',
        lending_policy_compliance_flag:     'No',
        fleet_availability_percent:         'No',

        storage_availability_flag:          'No',
        quality_sop_score_model_b:          'No standards (मापदण्ड छैन)',
        insurance_coverage_flag:            'No',
        digital_mis_flag:                   'No',
        regulatory_compliance_flag:         'None',
        climatic_risk_score:                '8',

        credit_history_banks:               'Substandard',
        dpd_days_banks:                     45,

        meeting_frequency:                  'Annually',
        member_info_transparency:           'Decided among few',
        fund_usage:                         'Other things',
        kyc_aml:                            'Hard',
        income_expense_checked:             'Never',
        right_to_information:               'Only after implementation',
        community_support_level:            'Never',
        emergency_response:                 'Nothing'
    }
};

// ── Panel UI ──────────────────────────────────────────────────────────────────

function _initDevPanel() {
    if (document.getElementById('_devpanel')) return;

    const style = document.createElement('style');
    style.textContent = `
        #_devpanel{position:fixed;bottom:24px;right:24px;z-index:88888;font-family:'DM Sans',sans-serif}
        #_devpanel_btn{width:44px;height:44px;background:#1a1a1a;color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:18px;box-shadow:0 4px 16px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s}
        #_devpanel_btn:hover{transform:scale(1.08);box-shadow:0 6px 24px rgba(0,0,0,.3)}
        #_devpanel_popup{display:none;position:absolute;bottom:54px;right:0;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.18);padding:14px;min-width:280px}
        #_devpanel_popup.open{display:block;animation:devPop .18s ease}
        @keyframes devPop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        ._devpanel_title{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;margin-bottom:10px}
        ._dp_btn{display:flex;align-items:center;gap:9px;width:100%;padding:9px 12px;border-radius:8px;border:1px solid #e5e7eb;background:#f9fafb;cursor:pointer;font-family:inherit;font-size:12px;font-weight:600;color:#1a1a1a;margin-bottom:6px;transition:all .15s;text-align:left}
        ._dp_btn:last-child{margin-bottom:0}
        ._dp_btn:hover{background:#f3f4f6;border-color:#d1d5db}
        ._dp_dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
        ._dp_label-wrap{display:flex;flex-direction:column;flex:1}
        ._dp_label-main{font-size:11.5px;font-weight:700;line-height:1.3}
        ._dp_label-meta{font-size:10px;color:#6b7280;font-weight:400;margin-top:1px}
        ._dp_divider{height:1px;background:#f3f4f6;margin:8px 0}
        ._dp_clear{width:100%;padding:7px 12px;border-radius:8px;border:1px solid #fca5a5;background:#fef2f2;cursor:pointer;font-family:inherit;font-size:11.5px;font-weight:600;color:#b91c1c;transition:all .15s}
        ._dp_clear:hover{background:#fee2e2}
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = '_devpanel';

    function btn(key, color, main, meta) {
        return `<button class="_dp_btn" onclick="fillTestData('${key}')">
            <span class="_dp_dot" style="background:${color}"></span>
            <span class="_dp_label-wrap">
                <span class="_dp_label-main">${main}</span>
                <span class="_dp_label-meta">${meta}</span>
            </span>
        </button>`;
    }

    panel.innerHTML = `
        <div id="_devpanel_popup">
            <div class="_devpanel_title">⚡ Quick Test Data</div>
            ${btn('col_new',      '#16a34a', 'Collection Only — New Customer',              'A Risk &bull; ~880 pts')}
            ${btn('col_existing', '#2563eb', 'Collection Only — Existing Customer',         'B Risk &bull; ~720 pts')}
            ${btn('proc_new',     '#d97706', 'Coll. &amp; Processing — New Customer',       'C Risk &bull; ~540 pts')}
            ${btn('proc_existing','#b91c1c', 'Coll. &amp; Processing — Existing Customer',  'D Risk &bull; ~290 pts')}
            <div class="_dp_divider"></div>
            <button class="_dp_clear" onclick="clearTestData()">✕ Clear All Fields</button>
        </div>
        <button id="_devpanel_btn" onclick="toggleDevPanel()" title="Quick Test Data">⚡</button>
    `;
    document.body.appendChild(panel);
}

function toggleDevPanel() {
    document.getElementById('_devpanel_popup')?.classList.toggle('open');
}

document.addEventListener('click', function(e) {
    const panel = document.getElementById('_devpanel');
    if (panel && !panel.contains(e.target))
        document.getElementById('_devpanel_popup')?.classList.remove('open');
});

// ── Fill logic ────────────────────────────────────────────────────────────────

async function fillTestData(presetKey) {
    const data = TEST_PRESETS[presetKey];
    if (!data) return;

    document.getElementById('_devpanel_popup')?.classList.remove('open');

    // Step 1 — set config state (model type + customer type)
    if (typeof setCoopType     === 'function') setCoopType(data._modelType);
    if (typeof setCustomerType === 'function') setCustomerType(data._customerType);

    // Step 2 — navigate to questions (renders the questionnaire on first call)
    if (typeof navigateTo === 'function') navigateTo('questions');

    // Step 3 — wait until the questionnaire DOM has inputs (up to 2 s)
    await _waitForQuestionsDOM();

    // Step 4 — fill every field
    var filled = 0;
    var missing = [];

    Object.entries(data).forEach(function([id, val]) {
        if (id.startsWith('_')) return;
        const el = document.getElementById(id);
        if (!el) { missing.push(id); return; }
        el.value = val;
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        filled++;
    });

    // Step 5 — run all auto-calculation functions
    if (typeof calculateTotalLoan    === 'function') calculateTotalLoan();
    if (typeof calculateRevenue      === 'function') calculateRevenue();
    if (typeof calculateBuyerShares  === 'function') calculateBuyerShares();
    if (typeof calculateExpenses     === 'function') calculateExpenses();
    if (typeof calculateAssets       === 'function') calculateAssets();
    if (typeof calculateLiabilities  === 'function') calculateLiabilities();
    if (typeof calculateNetWorth     === 'function') calculateNetWorth();
    if (typeof calculateMilkMetrics  === 'function') calculateMilkMetrics();

    if (missing.length) console.warn('[devtools] Not found in DOM:', missing);
    if (typeof showToast === 'function')
        showToast('Filled ' + filled + ' fields — ' + data._label, 'success');
}

/** Poll until questions_container has inputs, or give up after ~2 s */
function _waitForQuestionsDOM() {
    return new Promise(function(resolve) {
        var tries = 0, MAX = 40;
        (function check() {
            var c = document.getElementById('questions_container');
            if ((c && c.querySelectorAll('input,select').length > 0) || tries++ >= MAX)
                return resolve();
            setTimeout(check, 50);
        })();
    });
}

function clearTestData() {
    document.querySelectorAll('#questions_container input, #questions_container select')
        .forEach(function(el) {
            if (el.type === 'select-one') el.selectedIndex = 0;
            else el.value = '';
        });
    document.getElementById('_devpanel_popup')?.classList.remove('open');
    if (typeof showToast === 'function') showToast('All fields cleared.', 'info');
}

// ── Auto-init ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(_initDevPanel, 300);
});