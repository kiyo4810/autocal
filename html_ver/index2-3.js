// --- 定数の定義 ---
const START_AGE = 0; // シミュレーションを開始する年齢
const END_AGE = 100; // シミュレーションを終了する年齢
const COLUMN_COUNT = END_AGE - START_AGE + 1; // 合計の列数（0から100までなので101列）

function initializeTable() {
    const headerRow = document.getElementById('header-row');
    const tableBody = document.getElementById('table-body');
    for (let i = START_AGE; i < END_AGE; i++) {
        const th = document.createElement('th');
        th.innerText = `${i}歳`; // 中身を「〇〇歳」にする
        headerRow.appendChild(th); // ヘッダー行に作成したセルを追加。
    }

    /**
     * 項目の定義リスト（配列の配列）
     * [ラベル名, CSSクラス名, ID名, 初期値] の順で設定
     */
    const rowDefinitions = [
        ['【収入】', 'category-header', 'section'], // 見出し用の行（入力不可）
        ['初期所持金', '', 'init_cash', '100'], // 以下、入力項目
        ['手残り収入', '', 'income_net', '500'],
        ['その他収入', '', 'income_etc', '0'],
        ['-- 年間収入合計', 'subtotal-income-row', 'total_income'], // 計算結果表示用

        ['【支出】', 'category-header', 'section'],
        ['生活費', '', 'exp_life', '200'],
        ['住宅', '', 'exp_house', '120'],
        ['教育', '', 'exp_edu', '0'],
        ['車', '', 'exp_car', '0'],
        ['その他費用', '', 'exp_etc', '10'],
        ['-- 年間支出合計', 'subtotal-expense-row', 'total_expense'], // 計算結果表示用

        ['累計年残高', 'balance-row', 'grand_balance'], // 最終的な累計結果
    ];

    rowDefinitions.forEach(([label, className, rowId, defVal]) => {
        const tr = document.createElement('tr'); // 1行(<tr>)作成
        if (className) tr.className = className; // スタイル用のクラス名があれば設定
        const tdLabel = document.createElement('td');
        tdLabel.innerText = label;
        tdLabel.className = 'sticky-col'; // CSSで左側に固定するためのクラス
        tr.appendChild(tdLabel);
        console.log(tr);
    });
}
initializeTable();

function iniTable() {
    const hr2 = document.getElementById('header-row2');
    const colNum = 100;
    for (let index = 0; index < colNum; index++) {
        const th = document.createElement('th');
        th.innerText = `th${index + 1}番`;
        hr2.appendChild(th);
    }

    const tb2 = document.getElementById('table-body2');
    const rowNum = 15;
    for (let index = 0; index < rowNum; index++) {
        const tr = document.createElement('tr');
        for (let index = 0; index < colNum + 1; index++) {
            if (index === 0) {
                const th = document.createElement('th');
                th.innerText = `th ${index + 1}番`;
                tr.appendChild(th);
            } else {
                const td = document.createElement('td');
                td.innerText = `td${index} 番`;
                tr.appendChild(td);
            }
        }
        tb2.appendChild(tr);
    }
}
iniTable();
