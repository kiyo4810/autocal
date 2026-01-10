const START_AGE = 0;
const END_AGE = 100;
const COLUMN_COUNT = END_AGE - START_AGE + 1;

/**
 * テーブルの初期生成
 */
function initializeTable() {
    const headerRow = document.getElementById('header-row');
    const tableBody = document.getElementById('table-body');

    // 1. ヘッダー（0歳〜100歳）を作成
    for (let i = START_AGE; i <= END_AGE; i++) {
        const th = document.createElement('th');
        th.innerText = `${i}歳`;
        headerRow.appendChild(th);
    }

    // 2. 行の定義 [表示名, クラス名, 行ID(data-row用), デフォルト値, 初回列のみか]
    const rowDefinitions = [
        ['【プラス要因】', 'category-header', 'section', '', false],
        ['初期所持金', '', 'initial', '1000000', true],
        ['家賃収入', '', 'rent', '80000', false],
        ['【マイナス要因】', 'category-header', 'section', '', false],
        ['ローン支払', '', 'loan', '50000', false],
        ['管理費', '', 'mng', '10000', false],
        ['その他費用', '', 'etc', '5000', false],
        ['年間収支合計', 'result-row', 'monthly', '', false],
        ['累計残高', 'balance-row', 'balance', '', false],
    ];

    rowDefinitions.forEach(([label, className, rowId, defVal, isFirstOnly]) => {
        const tr = document.createElement('tr');
        if (className) tr.className = className;

        // 項目名（固定列）
        const tdLabel = document.createElement('td');
        tdLabel.innerText = label;
        tdLabel.className = 'sticky-col';
        tr.appendChild(tdLabel);

        if (rowId === 'section') {
            // カテゴリ見出しの場合は空のセルを埋める（またはcolspan）
            for (let i = 0; i < COLUMN_COUNT; i++) {
                tr.appendChild(document.createElement('td'));
            }
        } else {
            // データ入力・表示セル
            for (let col = 0; col < COLUMN_COUNT; col++) {
                const td = document.createElement('td');

                if (rowId === 'monthly' || rowId === 'balance') {
                    td.id = `${rowId}-${col}`;
                    td.innerText = '0';
                } else if (isFirstOnly && col > 0) {
                    td.innerText = '-';
                    td.style.color = '#ccc';
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

/**
 * 計算処理
 */
function calculate() {
    let prevBalance = 0;

    for (let col = 0; col < COLUMN_COUNT; col++) {
        const getVal = (rowId) => {
            const el = document.querySelector(
                `[data-row="${rowId}"][data-col="${col}"]`
            );
            return el ? parseFloat(el.value) || 0 : 0;
        };

        const rent = getVal('rent');
        const loan = getVal('loan');
        const mng = getVal('mng');
        const etc = getVal('etc');
        const initial = col === 0 ? getVal('initial') : 0;

        // 年間収支
        const yearlyTotal = rent - (loan + mng + etc);
        const monthlyEl = document.getElementById(`monthly-${col}`);
        monthlyEl.innerText = yearlyTotal.toLocaleString();
        monthlyEl.className = yearlyTotal >= 0 ? 'plus' : 'minus';

        // 累計残高
        const currentBalance = prevBalance + yearlyTotal + initial;
        const balanceEl = document.getElementById(`balance-${col}`);
        balanceEl.innerText = currentBalance.toLocaleString();

        prevBalance = currentBalance;
    }
}

// ナビゲーションのアクティブ設定
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === currentFile) link.classList.add('active');
});

// 実行
initializeTable();
calculate();
