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

    // 2. 行の定義 [表示名, クラス名, 行ID, デフォルト値, (削除:初回のみフラグ)]
    const rowDefinitions = [
        ['【プラス要因】', 'category-header', 'section', ''],
        ['初期/臨時所持金', '', 'initial', '0'], // 初期値を0に変更し、全年齢対応
        ['家賃収入', '', 'rent', '80000'],
        ['【マイナス要因】', 'category-header', 'section', ''],
        ['ローン支払', '', 'loan', '50000'],
        ['管理費', '', 'mng', '10000'],
        ['その他費用', '', 'etc', '5000'],
        ['年間収支合計', 'result-row', 'monthly', ''],
        ['累計残高', 'balance-row', 'balance', ''],
    ];

    rowDefinitions.forEach(([label, className, rowId, defVal]) => {
        const tr = document.createElement('tr');
        if (className) tr.className = className;

        // 項目名（固定列）
        const tdLabel = document.createElement('td');
        tdLabel.innerText = label;
        tdLabel.className = 'sticky-col';
        tr.appendChild(tdLabel);

        if (rowId === 'section') {
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

        const initial = getVal('initial'); // 各年齢でのプラス入力
        const rent = getVal('rent');
        const loan = getVal('loan');
        const mng = getVal('mng');
        const etc = getVal('etc');

        // 年間収支 (純粋なその年の収支)
        const yearlyTotal = rent - (loan + mng + etc);

        // 表示
        const monthlyEl = document.getElementById(`monthly-${col}`);
        monthlyEl.innerText = yearlyTotal.toLocaleString();
        monthlyEl.className = yearlyTotal >= 0 ? 'plus' : 'minus';

        // 累計残高 (前年残高 + その年の収支 + その年の臨時収入)
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
