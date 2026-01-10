const START_AGE = 0;
const END_AGE = 100;
const COLUMN_COUNT = END_AGE - START_AGE + 1;

function initializeTable() {
    const headerRow = document.getElementById('header-row');
    const tableBody = document.getElementById('table-body');

    for (let i = START_AGE; i <= END_AGE; i++) {
        const th = document.createElement('th');
        th.innerText = `${i}歳`;
        headerRow.appendChild(th);
    }

    // 項目定義（デフォルト値を万円単位に修正：例 80000円 -> 8万円）
    const rowDefinitions = [
        ['【収入】', 'category-header', 'section'],
        ['初期所持金', '', 'init_cash', '100'], // 100万円
        ['手残り収入', '', 'income_net', '500'], // 500万円
        ['その他収入', '', 'income_etc', '0'],
        ['-- 年間収入合計', 'subtotal-income-row', 'total_income'],

        ['【支出】', 'category-header', 'section'],
        ['生活費', '', 'exp_life', '200'], // 200万円
        ['住宅', '', 'exp_house', '120'], // 120万円
        ['教育', '', 'exp_edu', '0'],
        ['車', '', 'exp_car', '0'],
        ['その他費用', '', 'exp_etc', '10'],
        ['-- 年間支出合計', 'subtotal-expense-row', 'total_expense'],

        ['累計年残高', 'balance-row', 'grand_balance'],
    ];

    rowDefinitions.forEach(([label, className, rowId, defVal]) => {
        const tr = document.createElement('tr');
        if (className) tr.className = className;

        const tdLabel = document.createElement('td');
        tdLabel.innerText = label;
        tdLabel.className = 'sticky-col';
        tr.appendChild(tdLabel);

        if (rowId === 'section') {
            for (let i = 0; i < COLUMN_COUNT; i++)
                tr.appendChild(document.createElement('td'));
        } else {
            for (let col = 0; col < COLUMN_COUNT; col++) {
                const td = document.createElement('td');
                if (
                    ['total_income', 'total_expense', 'grand_balance'].includes(
                        rowId
                    )
                ) {
                    td.id = `${rowId}-${col}`;
                    td.innerText = '0';
                } else {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'val';
                    input.dataset.row = rowId;
                    input.dataset.col = col;
                    input.value = defVal;
                    input.addEventListener('input', calculate);
                    td.appendChild(input);
                }
                tr.appendChild(td);
            }
        }
        tableBody.appendChild(tr);
    });
}

function calculate() {
    let prevBalance = 0;

    for (let col = 0; col < COLUMN_COUNT; col++) {
        const getVal = (rowId) => {
            const el = document.querySelector(
                `[data-row="${rowId}"][data-col="${col}"]`
            );
            return el ? parseFloat(el.value) || 0 : 0;
        };

        // 収入計算
        const initCash = getVal('init_cash');
        const incomeNet = getVal('income_net');
        const incomeEtc = getVal('income_etc');
        const totalIncome = initCash + incomeNet + incomeEtc;
        document.getElementById(`total_income-${col}`).innerText =
            totalIncome.toLocaleString();

        // 支出計算
        const expLife = getVal('exp_life');
        const expHouse = getVal('exp_house');
        const expEdu = getVal('exp_edu');
        const expCar = getVal('exp_car');
        const expEtc = getVal('exp_etc');
        const totalExpense = expLife + expHouse + expEdu + expCar + expEtc;
        document.getElementById(`total_expense-${col}`).innerText =
            totalExpense.toLocaleString();

        // 累計残高計算
        const currentBalance = prevBalance + totalIncome - totalExpense;
        const balanceEl = document.getElementById(`grand_balance-${col}`);
        balanceEl.innerText = currentBalance.toLocaleString();

        // マイナス表示判定
        balanceEl.style.color = currentBalance < 0 ? '#dc3545' : '#28a745';

        prevBalance = currentBalance;
    }
}

// ナビゲーション処理などはそのまま
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === currentFile) link.classList.add('active');
});

initializeTable();
calculate();
