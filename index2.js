// --- 定数の定義 ---
const START_AGE = 0;   // シミュレーションを開始する年齢
const END_AGE = 100;   // シミュレーションを終了する年齢
const COLUMN_COUNT = END_AGE - START_AGE + 1; // 合計の列数（0から100までなので101列）

/**
 * テーブルの初期生成関数
 * 画面が読み込まれた時に、HTMLの<table>の中にヘッダーと行を自動で作ります。
 */
function initializeTable() {
    const headerRow = document.getElementById('header-row'); // 年齢を表示する行（<thead>内の<tr>）を取得
    const tableBody = document.getElementById('table-body'); // データを表示する本体（<tbody>）を取得

    // 1. ヘッダー行（0歳、1歳...）をループで作る
    for (let i = START_AGE; i <= END_AGE; i++) {
        const th = document.createElement('th'); // <th>タグ（見出しセル）を作成
        th.innerText = `${i}歳`;                // 中身を「〇〇歳」にする
        headerRow.appendChild(th);              // ヘッダー行に作成したセルを追加
    }

    /**
     * 項目の定義リスト（配列の配列）
     * [ラベル名, CSSクラス名, ID名, 初期値] の順で設定
     */
    const rowDefinitions = [
        ['【収入】', 'category-header', 'section'], // 見出し用の行（入力不可）
        ['初期所持金', '', 'init_cash', '100'],      // 以下、入力項目
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

    // 2. 定義した項目ごとに「行(tr)」と「セル(td)」を作る
    rowDefinitions.forEach(([label, className, rowId, defVal]) => {
        const tr = document.createElement('tr'); // 1行(<tr>)作成
            console.log(tr +"←チェックポイントA tr");
        if (className) tr.className = className; // スタイル用のクラス名があれば設定
            console.log(tr.className +"←チェックポイントB tr.className");
        // 行の左端（項目名）のセルを作成
        const tdLabel = document.createElement('td');
            console.log(tdLabel +"←チェックポイントC tdLabel");

        tdLabel.innerText = label;
            console.log(tdLabel.innerText +"←チェックポイントD tdLabel.innerText");

        tdLabel.className = 'sticky-col'; // CSSで左側に固定するためのクラス
            console.log(tdLabel.className +"←チェックポイントE tdLabel.className");

        tr.appendChild(tdLabel);
            console.log(tr +"←チェックポイントF tr");


        if (rowId === 'section') {
            // 見出し行（【収入】など）の場合、データの代わりに空のセルで埋める
            for (let i = 0; i < COLUMN_COUNT; i++)
                tr.appendChild(document.createElement('td'));
        } else {
            // 通常のデータ行の場合、101列分のセルを作る
            for (let col = 0; col < COLUMN_COUNT; col++) {
                const td = document.createElement('td');
                // 合計行や残高行（計算結果を表示するだけのセル）の場合
                if (
                    ['total_income', 'total_expense', 'grand_balance'].includes(rowId)
                ) {
                    td.id = `${rowId}-${col}`; // 後でJSから数字を書き換えるためにIDを振る
                    td.innerText = '0';        // 初期表示は0
                } else {
                    // ユーザーが数字を入力する「input」を作る
                    const input = document.createElement('input');
                    input.type = 'number';           // 数値入力専用
                    input.className = 'val';         // CSS用
                    input.dataset.row = rowId;       // どの項目か（行の情報）を保持
                    input.dataset.col = col;         // 何歳か（列の情報）を保持
                    input.value = defVal;            // 初期値をセット
                    input.addEventListener('input', calculate); // 入力されたら即座に再計算
                    td.appendChild(input);           // セルにinputを入れる
                }
                tr.appendChild(