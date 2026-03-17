/**
 * questions.js — Complete Static Questionnaire Definition
 * All 15 sections for Dairy Cooperative Credit Scoring Portal
 *
 * Rules enforced by formHandler.js:
 *   - readonly: true  → rendered as hidden input (not shown to user)
 *   - disabled: true  → rendered as hidden input (auto-filled by config)
 *   - isModelB: true  → only shown when model is Collection & Processing
 *   - All visible fields are mandatory before submission
 *   - Scoring points are stripped from labels at render time
 */

const QUESTIONNAIRE = {
    sections: [

        // ── Section 1: Identity & Classification ──────────────────────────────
        {
            id: 'section_1',
            title: 'Identity & Classification',
            icon: 'info',
            subtitle: 'Basic identity and cooperative classification',
            questions: [
                {
                    id: 'coop_name', type: 'text',
                    labelEng: 'Cooperative Name',
                    labelNep: 'सहकारीको नाम',
                    required: true, placeholder: 'e.g., ABC Dairy Cooperative'
                },
                {
                    id: 'model_type', type: 'select',
                    labelEng: 'Model A / B',
                    labelNep: 'सहकारी मोडल',
                    disabled: true,
                    options: [
                        { value: '', label: '-- Select Above --' },
                        { value: 'Milk Collection Only (Model A)', label: 'Milk Collection Only (Model A)' },
                        { value: 'Collection & Processing (Model B)', label: 'Collection & Processing (Model B)' }
                    ]
                },
                {
                    id: 'loan_type', type: 'select',
                    labelEng: 'Loan New or Existing?',
                    labelNep: 'ऋण नयाँ हो कि पहिलेबाट?',
                    disabled: true,
                    options: [
                        { value: 'New Loan', label: 'New Loan' },
                        { value: 'Existing Loan', label: 'Existing Loan' }
                    ]
                },
                {
                    id: 'years_operation', type: 'number',
                    labelEng: 'Years in Operation',
                    labelNep: 'सञ्चालनमा कति वर्ष?',
                    min: 0, placeholder: 'e.g., 10'
                },
                {
                    id: 'office_location', type: 'text',
                    labelEng: 'Office Location',
                    labelNep: 'कार्यालय कहाँ छ?',
                    placeholder: 'e.g., Kathmandu, Bagmati'
                }
            ]
        },

        // ── Section 2: Loan Information ────────────────────────────────────────
        {
            id: 'section_2',
            title: 'Loan Information',
            icon: 'landmark',
            subtitle: 'Loan amount, tenure, and collateral details',
            questions: [
                {
                    id: 'existing_loan', type: 'number',
                    labelEng: 'Existing Loan Outstanding, NPR',
                    labelNep: 'हाल चालु ऋणको बाँकी रकम',
                    min: 0, placeholder: 'e.g., 1500000',
                    oninput: 'calculateTotalLoan()'
                },
                {
                    id: 'proposed_loan', type: 'number',
                    labelEng: 'Proposed New Loan, NPR',
                    labelNep: 'नयाँ प्रस्तावित ऋण रकम',
                    min: 0, placeholder: 'e.g., 2000000',
                    oninput: 'calculateTotalLoan()'
                },
                {
                    id: 'total_loan', type: 'number',
                    labelEng: 'Total Loan (Auto)',
                    labelNep: 'जम्मा ऋण',
                    readonly: true
                },
                {
                    id: 'interest_rate', type: 'number',
                    labelEng: 'Interest Rate % p.a.',
                    labelNep: 'ऋणको ब्याजदर %',
                    step: 0.01, min: 0, max: 100, placeholder: 'e.g., 10'
                },
                {
                    id: 'loan_tenure', type: 'number',
                    labelEng: 'Loan Tenure, Months',
                    labelNep: 'ऋण तिर्ने अवधि महिना',
                    min: 1, placeholder: 'e.g., 60'
                },
                {
                    id: 'installment_freq', type: 'select',
                    labelEng: 'Installment Frequency',
                    labelNep: 'किस्ताको भुक्तानी आवृत्ति',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Monthly', label: 'Monthly — मासिक' },
                        { value: 'Quarterly', label: 'Quarterly — त्रैमासिक' },
                        { value: 'Semi-Annual', label: 'Semi-Annual — अर्धवार्षिक' },
                        { value: 'Annual', label: 'Annual — वार्षिक' }
                    ]
                },
                {
                    id: 'primary_land_value', type: 'number',
                    labelEng: 'Primary Land Collateral Value, NPR',
                    labelNep: 'प्राथमिक धितोमा जग्गाको मूल्य',
                    min: 0, placeholder: 'e.g., 5000000'
                }
            ]
        },

        // ── Section 3: Revenue & Sales ─────────────────────────────────────────
        {
            id: 'section_3',
            title: 'Revenue & Sales',
            icon: 'trending-up',
            subtitle: 'Income from milk sales, other products and grants',
            questions: [
                {
                    id: 'milk_sales', type: 'number',
                    labelEng: 'Income from Milk Sales, NPR',
                    labelNep: 'दूध बिक्रीबाट आम्दानी',
                    min: 0, placeholder: 'e.g., 28000000',
                    oninput: 'calculateRevenue()'
                },
                {
                    id: 'other_product_sales', type: 'number',
                    labelEng: 'Other Product Sales, NPR',
                    labelNep: 'अन्य उत्पादन बिक्री',
                    min: 0, placeholder: 'e.g., 1800000',
                    oninput: 'calculateRevenue()'
                },
                {
                    id: 'other_income', type: 'number',
                    labelEng: 'Other Income, NPR',
                    labelNep: 'अन्य आम्दानी',
                    min: 0, placeholder: 'e.g., 200000',
                    oninput: 'calculateRevenue()'
                },
                {
                    id: 'total_sales', type: 'number',
                    labelEng: 'Total Sales (Auto)',
                    labelNep: 'कुल बिक्री',
                    readonly: true
                },
                {
                    id: 'grant_income', type: 'number',
                    labelEng: 'Grant / Subsidy Income, NPR',
                    labelNep: 'अनुदानबाट आम्दानी',
                    min: 0, placeholder: 'e.g., 500000',
                    oninput: 'calculateRevenue()'
                },
                {
                    id: 'total_revenue', type: 'number',
                    labelEng: 'Total Revenue (Auto)',
                    labelNep: 'कुल आम्दानी',
                    readonly: true
                },
                {
                    id: 'bank_sales', type: 'number',
                    labelEng: 'Sales via Bank, NPR',
                    labelNep: 'बैंक मार्फत भएको बिक्री',
                    min: 0, placeholder: 'e.g., 15000000'
                }
            ]
        },

        // ── Section 4: Buyer Analysis ──────────────────────────────────────────
        {
            id: 'section_4',
            title: 'Buyer Analysis',
            icon: 'users',
            subtitle: 'Buyer concentration and collection period',
            questions: [
                {
                    id: 'total_buyers', type: 'number',
                    labelEng: 'Total Number of Buyers',
                    labelNep: 'जम्मा खरिदकर्ता संख्या',
                    min: 1, placeholder: 'e.g., 300'
                },
                {
                    id: 'top5_buyers_sales', type: 'number',
                    labelEng: 'Sales from Top 5 Buyers, NPR',
                    labelNep: 'शीर्ष ५ खरिदकर्ताबाट बिक्री',
                    min: 0, placeholder: 'e.g., 8000000',
                    oninput: 'calculateBuyerShares()'
                },
                {
                    id: 'largest_buyer_sales', type: 'number',
                    labelEng: 'Largest Single Buyer Sales, NPR',
                    labelNep: 'सबैभन्दा ठूलो खरिदकर्ताबाट बिक्री',
                    min: 0, placeholder: 'e.g., 2000000',
                    oninput: 'calculateBuyerShares()'
                },
                {
                    id: 'top5_buyer_pct', type: 'number',
                    labelEng: 'Top 5 Buyers Share % (Auto)',
                    labelNep: 'शीर्ष ५ खरिदकर्ताको हिस्सा %',
                    readonly: true
                },
                {
                    id: 'largest_buyer_pct', type: 'number',
                    labelEng: 'Largest Buyer Share % (Auto)',
                    labelNep: 'ठूलो खरिदकर्ताको हिस्सा %',
                    readonly: true
                },
                {
                    id: 'avg_collection_days', type: 'number',
                    labelEng: 'Avg Collection Period, Days',
                    labelNep: 'भुक्तानी गर्न औसत दिन',
                    min: 0, placeholder: 'e.g., 35'
                }
            ]
        },

        // ── Section 5: Operating Costs ─────────────────────────────────────────
        {
            id: 'section_5',
            title: 'Operating Costs',
            icon: 'receipt',
            subtitle: 'All operating cost inputs for the cooperative',
            questions: [
                {
                    id: 'raw_milk_cost', type: 'number',
                    labelEng: 'Cost of Raw Milk Purchase, NPR',
                    labelNep: 'कच्चा दूध किन्न खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'processing_cost', type: 'number',
                    labelEng: 'Processing Cost, NPR',
                    labelNep: 'प्रशोधन खर्च',
                    isModelB: true, min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'packaging_cost', type: 'number',
                    labelEng: 'Packaging Cost, NPR',
                    labelNep: 'प्याकेजिङ खर्च',
                    isModelB: true, min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'transport_cost', type: 'number',
                    labelEng: 'Transportation Cost, NPR',
                    labelNep: 'ढुवानी खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'other_processing_cost', type: 'number',
                    labelEng: 'Other Processing Cost, NPR',
                    labelNep: 'अन्य प्रशोधन खर्च',
                    isModelB: true, min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'salary_expense', type: 'number',
                    labelEng: 'Salary Expense, NPR',
                    labelNep: 'तलब खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'admin_expense', type: 'number',
                    labelEng: 'Administrative Expense, NPR',
                    labelNep: 'प्रशासनिक खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'electricity_expense', type: 'number',
                    labelEng: 'Electricity Expense, NPR',
                    labelNep: 'विद्युत खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'fuel_expense', type: 'number',
                    labelEng: 'Fuel Expense, NPR',
                    labelNep: 'इन्धन खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'repair_expense', type: 'number',
                    labelEng: 'Repair & Maintenance, NPR',
                    labelNep: 'मर्मत खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'rent_expense', type: 'number',
                    labelEng: 'Rent Expense, NPR',
                    labelNep: 'भाडा खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'other_opex', type: 'number',
                    labelEng: 'Other Operating Expense, NPR',
                    labelNep: 'अन्य सञ्चालन खर्च',
                    min: 0, oninput: 'calculateExpenses()'
                },
                {
                    id: 'total_opex', type: 'number',
                    labelEng: 'Total Operating Expenses (Auto)',
                    labelNep: 'कुल सञ्चालन खर्च',
                    readonly: true
                },
                {
                    id: 'annual_depreciation', type: 'number',
                    labelEng: 'Annual Depreciation, NPR',
                    labelNep: 'वार्षिक मूल्यह्रास',
                    min: 0, placeholder: 'e.g., 200000'
                },
                {
                    id: 'amortization_amount', type: 'number',
                    labelEng: 'Amortization Amount, NPR',
                    labelNep: 'अमोर्टाइजेसन',
                    min: 0, placeholder: 'e.g., 0'
                }
            ]
        },

        // ── Section 6: Financial Performance ──────────────────────────────────
        {
            id: 'section_6',
            title: 'Financial Performance',
            icon: 'bar-chart-2',
            subtitle: 'Cash trend, audit status and inventory',
            questions: [
                {
                    id: 'cash_last_year', type: 'number',
                    labelEng: 'Last Year Cash/Bank Balance, NPR',
                    labelNep: 'गत वर्ष बैंक/नगद मौज्दात',
                    min: 0, placeholder: 'e.g., 3000000'
                },
                {
                    id: 'cash_prev_year', type: 'number',
                    labelEng: 'Previous Year Cash/Bank Balance, NPR',
                    labelNep: 'अघिल्लो वर्ष बैंक/नगद मौज्दात',
                    min: 0, placeholder: 'e.g., 2500000'
                },
                {
                    id: 'lowest_monthly_expense', type: 'number',
                    labelEng: 'Lowest Monthly Expense (Lean Month), NPR',
                    labelNep: 'सबैभन्दा कम खर्च हुने महिनाको खर्च',
                    min: 0, placeholder: 'e.g., 300000',
                    hint: 'Enter the expense of your lowest-cost month in the year'
                },
                {
                    id: 'income_expense_checked', type: 'select',
                    labelEng: 'Are accounts audited?',
                    labelNep: 'हिसाब-किताब जाँच भयो?',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Regularly', label: 'Regularly — नियमित' },
                        { value: 'Occasionally', label: 'Occasionally — कहिलेकाहीँ' },
                        { value: 'Never', label: 'Never — कहिल्यै नगरेको' }
                    ]
                },
                {
                    id: 'audit_observations', type: 'number',
                    labelEng: 'Number of Audit Observations/Issues',
                    labelNep: 'लेखापरीक्षण अवलोकनको संख्या',
                    min: 0, placeholder: 'e.g., 2',
                    hint: 'Enter 0 if no issues were found'
                },
                {
                    id: 'avg_inventory_value', type: 'number',
                    labelEng: 'Average Inventory Value, NPR',
                    labelNep: 'औसत इन्भेन्टरी मूल्य',
                    min: 0, placeholder: 'e.g., 500000'
                }
            ]
        },

        // ── Section 7: Assets ──────────────────────────────────────────────────
        {
            id: 'section_7',
            title: 'Assets',
            icon: 'package',
            subtitle: 'Current and fixed asset holdings',
            questions: [
                {
                    id: 'cash_hand', type: 'number',
                    labelEng: 'Cash in Hand, NPR',
                    labelNep: 'हातमा नगद',
                    min: 0, placeholder: 'e.g., 50000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'bank_balance', type: 'number',
                    labelEng: 'Bank Balance, NPR',
                    labelNep: 'बैंक खातामा रकम',
                    min: 0, placeholder: 'e.g., 2000000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'total_cash', type: 'number',
                    labelEng: 'Total Cash (Auto)',
                    labelNep: 'कुल नगद',
                    readonly: true
                },
                {
                    id: 'accounts_receivable', type: 'number',
                    labelEng: 'Accounts Receivable, NPR',
                    labelNep: 'लिनु बाँकी रकम',
                    min: 0, placeholder: 'e.g., 500000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'inventory_value', type: 'number',
                    labelEng: 'Inventory Value, NPR',
                    labelNep: 'इन्भेन्टरीको मूल्य',
                    min: 0, placeholder: 'e.g., 300000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'prepaid_expenses', type: 'number',
                    labelEng: 'Prepaid Expenses, NPR',
                    labelNep: 'अग्रिम भुक्तानी खर्च',
                    min: 0, placeholder: 'e.g., 50000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'other_current_assets', type: 'number',
                    labelEng: 'Other Current Assets, NPR',
                    labelNep: 'अन्य चालु सम्पत्ति',
                    min: 0, placeholder: 'e.g., 100000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'total_current_assets', type: 'number',
                    labelEng: 'Total Current Assets (Auto)',
                    labelNep: 'कुल चालु सम्पत्ति',
                    readonly: true
                },
                {
                    id: 'land_value', type: 'number',
                    labelEng: 'Land Value, NPR',
                    labelNep: 'जग्गाको मूल्य',
                    min: 0, placeholder: 'e.g., 5000000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'building_value', type: 'number',
                    labelEng: 'Building Value, NPR',
                    labelNep: 'भवनको मूल्य',
                    min: 0, placeholder: 'e.g., 2000000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'machinery_value', type: 'number',
                    labelEng: 'Machinery & Equipment Value, NPR',
                    labelNep: 'मेसिनरी र उपकरणको मूल्य',
                    min: 0, placeholder: 'e.g., 1500000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'vehicle_value', type: 'number',
                    labelEng: 'Vehicle Value, NPR',
                    labelNep: 'सवारी साधनको मूल्य',
                    min: 0, placeholder: 'e.g., 800000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'furniture_value', type: 'number',
                    labelEng: 'Furniture & Fixtures, NPR',
                    labelNep: 'फर्निचर र फिक्सचरको मूल्य',
                    min: 0, placeholder: 'e.g., 200000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'other_fixed_assets', type: 'number',
                    labelEng: 'Other Fixed Assets, NPR',
                    labelNep: 'अन्य स्थायी सम्पत्ति',
                    min: 0, placeholder: 'e.g., 100000',
                    oninput: 'calculateAssets()'
                },
                {
                    id: 'total_fixed_assets', type: 'number',
                    labelEng: 'Total Fixed Assets (Auto)',
                    labelNep: 'कुल स्थायी सम्पत्ति',
                    readonly: true
                },
                {
                    id: 'total_assets', type: 'number',
                    labelEng: 'Total Assets (Auto)',
                    labelNep: 'कुल सम्पत्ति',
                    readonly: true
                }
            ]
        },

        // ── Section 8: Liabilities ─────────────────────────────────────────────
        {
            id: 'section_8',
            title: 'Liabilities',
            icon: 'credit-card',
            subtitle: 'Current and long-term liabilities',
            questions: [
                {
                    id: 'accounts_payable', type: 'number',
                    labelEng: 'Accounts Payable, NPR',
                    labelNep: 'दिनु बाँकी रकम',
                    min: 0, placeholder: 'e.g., 500000',
                    oninput: 'calculateLiabilities()'
                },
                {
                    id: 'short_term_loan', type: 'number',
                    labelEng: 'Short-Term Loan, NPR',
                    labelNep: 'अल्पकालीन ऋण',
                    min: 0, placeholder: 'e.g., 1000000',
                    oninput: 'calculateLiabilities()'
                },
                {
                    id: 'accrued_expenses', type: 'number',
                    labelEng: 'Accrued Expenses, NPR',
                    labelNep: 'सञ्चित खर्च',
                    min: 0, placeholder: 'e.g., 200000',
                    oninput: 'calculateLiabilities()'
                },
                {
                    id: 'current_ltd', type: 'number',
                    labelEng: 'Current Portion of Long-Term Debt, NPR',
                    labelNep: 'दीर्घकालीन ऋणको चालु भाग',
                    min: 0, placeholder: 'e.g., 600000',
                    oninput: 'calculateLiabilities()'
                },
                {
                    id: 'total_current_liabilities', type: 'number',
                    labelEng: 'Total Current Liabilities (Auto)',
                    labelNep: 'कुल चालु दायित्व',
                    readonly: true
                },
                {
                    id: 'long_term_loan', type: 'number',
                    labelEng: 'Long-Term Loan, NPR',
                    labelNep: 'दीर्घकालीन ऋण',
                    min: 0, placeholder: 'e.g., 3000000',
                    oninput: 'calculateLiabilities()'
                },
                {
                    id: 'other_ltl', type: 'number',
                    labelEng: 'Other Long-Term Liabilities, NPR',
                    labelNep: 'अन्य दीर्घकालीन दायित्व',
                    min: 0, placeholder: 'e.g., 0',
                    oninput: 'calculateLiabilities()'
                },
                {
                    id: 'total_long_term_liabilities', type: 'number',
                    labelEng: 'Total Long-Term Liabilities (Auto)',
                    labelNep: 'कुल दीर्घकालीन दायित्व',
                    readonly: true
                },
                {
                    id: 'total_liabilities', type: 'number',
                    labelEng: 'Total Liabilities (Auto)',
                    labelNep: 'कुल दायित्व',
                    readonly: true
                }
            ]
        },

        // ── Section 9: Net Worth & Equity ──────────────────────────────────────
        {
            id: 'section_9',
            title: 'Net Worth & Equity',
            icon: 'trending-up',
            subtitle: 'Equity, reserves and net worth position',
            questions: [
                {
                    id: 'paid_up_capital', type: 'number',
                    labelEng: 'Paid-Up Capital, NPR',
                    labelNep: 'चुक्ता पूँजी',
                    min: 0, placeholder: 'e.g., 2000000',
                    oninput: 'calculateNetWorth()'
                },
                {
                    id: 'retained_earnings', type: 'number',
                    labelEng: 'Retained Earnings, NPR',
                    labelNep: 'संचित नाफा',
                    placeholder: 'e.g., 500000 (can be negative)',
                    oninput: 'calculateNetWorth()'
                },
                {
                    id: 'reserve_fund', type: 'number',
                    labelEng: 'Reserve Fund, NPR',
                    labelNep: 'कोष / रिजर्भ',
                    min: 0, placeholder: 'e.g., 300000',
                    oninput: 'calculateNetWorth()'
                },
                {
                    id: 'total_net_worth', type: 'number',
                    labelEng: 'Total Net Worth (Auto)',
                    labelNep: 'कुल निवल सम्पत्ति',
                    readonly: true
                }
            ]
        },

        // ── Section 10: Milk Collection & Supply ──────────────────────────────
        {
            id: 'section_10',
            title: 'Milk Collection & Supply',
            icon: 'droplets',
            subtitle: 'Milk volumes, losses and farmer data',
            questions: [
                {
                    id: 'total_milk_collected', type: 'number',
                    labelEng: 'Total Milk Collected (Annual), Litres',
                    labelNep: 'वार्षिक जम्मा दूध सङ्कलन लिटर',
                    min: 0, placeholder: 'e.g., 2000000',
                    oninput: 'calculateMilkMetrics()'
                },
                {
                    id: 'milk_loss', type: 'number',
                    labelEng: 'Milk Loss (Collection), Litres',
                    labelNep: 'दूध हानी (सङ्कलनमा)',
                    min: 0, placeholder: 'e.g., 40000',
                    oninput: 'calculateMilkMetrics()'
                },
                {
                    id: 'processing_loss', type: 'number',
                    labelEng: 'Milk Loss (Processing), Litres',
                    labelNep: 'दूध हानी (प्रशोधनमा)',
                    isModelB: true, min: 0, placeholder: 'e.g., 20000',
                    oninput: 'calculateMilkMetrics()'
                },
                {
                    id: 'total_milk_sold', type: 'number',
                    labelEng: 'Total Milk Sold / Dispatched (Auto)',
                    labelNep: 'कुल दूध बिक्री / पठाइएको',
                    readonly: true
                },
                {
                    id: 'avg_monthly_milk', type: 'number',
                    labelEng: 'Average Monthly Milk Collection, Litres',
                    labelNep: 'मासिक औसत दूध सङ्कलन',
                    min: 0, placeholder: 'e.g., 170000'
                },
                {
                    id: 'lowest_monthly_milk', type: 'number',
                    labelEng: 'Lowest Monthly Milk Collection, Litres',
                    labelNep: 'सबैभन्दा कम महिनाको दूध सङ्कलन',
                    min: 0, placeholder: 'e.g., 100000'
                },
                {
                    id: 'collection_days', type: 'number',
                    labelEng: 'Collection Days per Year',
                    labelNep: 'वार्षिक सङ्कलन दिन',
                    min: 0, max: 365, placeholder: 'e.g., 340'
                },
                {
                    id: 'total_farmers', type: 'number',
                    labelEng: 'Total Number of Farmers',
                    labelNep: 'कुल किसान संख्या',
                    min: 0, placeholder: 'e.g., 450',
                    oninput: 'calculateMilkMetrics()'
                },
                {
                    id: 'avg_milk_per_farmer', type: 'number',
                    labelEng: 'Avg Milk per Farmer (Auto), Litres',
                    labelNep: 'प्रति किसान औसत दूध लिटर',
                    readonly: true
                },
                {
                    id: 'top5_farmers_milk', type: 'number',
                    labelEng: 'Top 5 Farmers Milk Share, Litres',
                    labelNep: 'शीर्ष ५ किसानको दूध सङ्कलन',
                    min: 0, placeholder: 'e.g., 300000',
                    hint: 'Total milk collected by your top 5 supplying farmers'
                }
            ]
        },

        // ── Section 11: Logistics & Infrastructure ────────────────────────────
        {
            id: 'section_11',
            title: 'Logistics & Infrastructure',
            icon: 'truck',
            subtitle: 'Logistics, infrastructure and risk assessment',
            questions: [
                {
                    id: 'vehicle_avail_pct', type: 'number',
                    labelEng: 'Vehicle Availability %, Annual',
                    labelNep: 'सवारी उपलब्धता % वार्षिक',
                    min: 0, max: 100, placeholder: 'e.g., 85'
                },
                {
                    id: 'storage_cold_facility', type: 'select',
                    labelEng: 'Cold Storage / Chilling Facility?',
                    labelNep: 'चिसो भण्डारण सुविधा छ?',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Yes', label: 'Yes — भएको छ' },
                        { value: 'No', label: 'No — छैन' }
                    ]
                },
                {
                    id: 'digital_mis_pos', type: 'select',
                    labelEng: 'Digital MIS / POS System?',
                    labelNep: 'डिजिटल एमआईएस / पीओएस प्रणाली?',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Yes', label: 'Yes — पूर्णरूपमा' },
                        { value: 'Partial', label: 'Partial — आंशिक' },
                        { value: 'No', label: 'No — छैन' }
                    ]
                },
                {
                    id: 'quality_sop_score', type: 'select',
                    labelEng: 'Quality SOP / Compliance Level',
                    labelNep: 'गुणस्तर SOP / अनुपालन स्तर',
                    hint: 'Rate the level of quality standards and SOP compliance in your cooperative',
                    options: [
                        { value: '', label: 'Select' },
                        { value: '85', label: 'Strong — उच्च' },
                        { value: '65', label: 'Good — राम्रो' },
                        { value: '45', label: 'Basic — आधारभूत' },
                        { value: '15', label: 'None / Very Poor — छैन' }
                    ]
                },
                {
                    id: 'climatic_risk_score', type: 'select',
                    labelEng: 'Climatic / Natural Disaster Risk Level',
                    labelNep: 'जलवायु / प्राकृतिक प्रकोप जोखिम स्तर',
                    hint: 'Select the level of climatic or natural disaster risk in your area',
                    options: [
                        { value: '', label: 'Select' },
                        { value: '2', label: 'Low — न्यून जोखिम' },
                        { value: '5', label: 'Medium — मध्यम जोखिम' },
                        { value: '8', label: 'High — उच्च जोखिम' }
                    ]
                }
            ]
        },

        // ── Section 12: Loan Recovery & NPA ───────────────────────────────────
        {
            id: 'section_12',
            title: 'Loan Recovery & NPA',
            icon: 'alert-circle',
            subtitle: 'Member loan portfolio and repayment quality',
            questions: [
                {
                    id: 'total_member_loans', type: 'number',
                    labelEng: 'Total Member Loans Outstanding, NPR',
                    labelNep: 'सदस्यहरूको कुल ऋण बाँकी',
                    min: 0, placeholder: 'e.g., 5000000'
                },
                {
                    id: 'npa_member_loans', type: 'number',
                    labelEng: 'NPA Member Loans, NPR',
                    labelNep: 'खराब ऋण (NPA) रकम',
                    min: 0, placeholder: 'e.g., 200000',
                    hint: 'Non-Performing Assets — loans overdue by 90+ days'
                },
                {
                    id: 'max_dpd_members', type: 'number',
                    labelEng: 'Maximum Days Past Due (Members)',
                    labelNep: 'सदस्यहरूको अधिकतम विलम्बित दिन',
                    min: 0, placeholder: 'e.g., 45'
                },
                {
                    id: 'restructured_loans_3yr', type: 'select',
                    labelEng: 'Loan Restructuring in Past 3 Years?',
                    labelNep: 'पछिल्लो ३ वर्षमा ऋण पुनर्संरचना?',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'None', label: 'None — भएको छैन' },
                        { value: 'Few Times', label: 'Few Times — केही पटक' },
                        { value: 'Frequently', label: 'Frequently — धेरै पटक' }
                    ]
                }
            ]
        },

        // ── Section 13: Governance & Management ───────────────────────────────
        {
            id: 'section_13',
            title: 'Governance & Management',
            icon: 'shield',
            subtitle: 'Management experience and governance practices',
            questions: [
                {
                    id: 'mgmt_experience', type: 'number',
                    labelEng: 'Management Experience, Years',
                    labelNep: 'व्यवस्थापकीय अनुभव वर्ष',
                    min: 0, placeholder: 'e.g., 8'
                },
                {
                    id: 'internal_control_score', type: 'select',
                    labelEng: 'Internal Control Strength',
                    labelNep: 'आन्तरिक नियन्त्रण बलियोपन',
                    hint: 'Assess the overall strength of internal financial controls',
                    options: [
                        { value: '', label: 'Select' },
                        { value: '85', label: 'Strong — बलियो' },
                        { value: '65', label: 'Adequate — पर्याप्त' },
                        { value: '45', label: 'Weak — कमजोर' },
                        { value: '20', label: 'Very Weak — धेरै कमजोर' }
                    ]
                },
                {
                    id: 'loan_policy_compliance', type: 'select',
                    labelEng: 'Loan Policy Compliance?',
                    labelNep: 'ऋण नीति पालना भयो?',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Yes', label: 'Yes — भयो' },
                        { value: 'No', label: 'No — भएन' }
                    ]
                },
                {
                    id: 'meeting_frequency', type: 'select',
                    labelEng: 'Committee Meeting Frequency',
                    labelNep: 'समिति बैठकको आवृत्ति',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Weekly', label: 'Weekly — साप्ताहिक' },
                        { value: 'Bi-Weekly', label: 'Bi-Weekly — दुई सातामा' },
                        { value: 'Monthly', label: 'Monthly — मासिक' },
                        { value: 'Rarely', label: 'Rarely — कहिलेकाहीँ' }
                    ]
                }
            ]
        },

        // ── Section 14: External Risk & Credit History ─────────────────────────
        {
            id: 'section_14',
            title: 'External Risk & Credit History',
            icon: 'globe',
            subtitle: 'Insurance, regulatory compliance and BFI credit record',
            questions: [
                {
                    id: 'insurance_available', type: 'select',
                    labelEng: 'Insurance Coverage Available?',
                    labelNep: 'बीमा सुरक्षा छ?',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Yes', label: 'Yes — छ' },
                        { value: 'No', label: 'No — छैन' }
                    ]
                },
                {
                    id: 'regulatory_compliance', type: 'select',
                    labelEng: 'Regulatory Compliance Status',
                    labelNep: 'नियामक अनुपालन स्थिति',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Yes', label: 'Yes — पूर्ण' },
                        { value: 'Partial', label: 'Partial — आंशिक' },
                        { value: 'No', label: 'No — छैन' }
                    ]
                },
                {
                    id: 'credit_history_bfi', type: 'select',
                    labelEng: 'BFI Credit Classification',
                    labelNep: 'बैंक / वित्त संस्थाको कर्जा वर्गीकरण',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Pass', label: 'Pass — सामान्य' },
                        { value: 'Watch List', label: 'Watch List — निगरानी' },
                        { value: 'Substandard', label: 'Substandard — अनियमित' },
                        { value: 'Doubtful', label: 'Doubtful — शंकास्पद' },
                        { value: 'Loss', label: 'Loss — नोक्सान' }
                    ]
                },
                {
                    id: 'max_dpd_bfi', type: 'number',
                    labelEng: 'Max Days Past Due (BFI Loan)',
                    labelNep: 'BFI ऋणमा अधिकतम विलम्बित दिन',
                    min: 0, placeholder: 'e.g., 0',
                    hint: 'Enter 0 if no overdue payments on BFI loans'
                }
            ]
        },

        // ── Section 15: Behavioral & Community ────────────────────────────────
        {
            id: 'section_15',
            title: 'Behavioral & Community',
            icon: 'heart',
            subtitle: 'Community engagement and operational readiness',
            questions: [
                {
                    id: 'community_support_level', type: 'select',
                    labelEng: 'Community Support Level',
                    labelNep: 'सामुदायिक सहयोगको स्तर',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Significant', label: 'Significant — उच्च' },
                        { value: 'Moderate', label: 'Moderate — मध्यम' },
                        { value: 'Minimal', label: 'Minimal — न्यून' }
                    ]
                },
                {
                    id: 'emergency_response', type: 'select',
                    labelEng: 'Emergency Response Plan',
                    labelNep: 'आपतकालीन प्रतिक्रिया योजना',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Proper Plan', label: 'Proper Plan — उचित योजना' },
                        { value: 'Ad-hoc', label: 'Ad-hoc — तत्कालीन' },
                        { value: 'No Plan', label: 'No Plan — योजना छैन' }
                    ]
                },
                {
                    id: 'farmer_training_freq', type: 'select',
                    labelEng: 'Farmer Training Frequency',
                    labelNep: 'किसान तालिमको आवृत्ति',
                    options: [
                        { value: '', label: 'Select' },
                        { value: 'Quarterly', label: 'Quarterly — त्रैमासिक' },
                        { value: 'Annually', label: 'Annually — वार्षिक' },
                        { value: 'Rarely', label: 'Rarely — कहिलेकाहीँ' }
                    ]
                }
            ]
        }

    ]
};