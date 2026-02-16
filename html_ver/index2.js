// --- 定数の定義 ---
const START_AGE = 0; // シミュレーションを開始する年齢
const END_AGE = 100; // シミュレーションを終了する年齢
const COLUMN_COUNT = END_AGE - START_AGE + 1; // 合計の列数（0から100までなので101列）

/**
 * テーブルの初期生成関数
 * 画面が読み込まれた時に、HTMLの<table>の中にヘッダーと行を自動で作ります。
 */
// function initializeTable() {
function initializeTable() {
    // const headerRow = document.getElementById('header-row'); // 年齢を表示する行（<thead>内の<tr>）を取得
    // const tableBody = document.getElementById('table-body'); // データを表示する本体（<tbody>）を取得
    const headerRow = document.getElementById('header-row');
    const tableBody = document.getElementById('table-body');
    console.log(headerRow);
    console.log(tableBody);
    // 1. ヘッダー行（0歳、1歳...）をループで作
    // for (let i = START_AGE; i <= END_AGE; i++) {
    for (let i = START_AGE; i <= END_AGE; i++) {
        const th = document.createElement('th'); // <th>タグ（見出しセル）を作成
        th.innerText = `${i}歳`; // 中身を「〇〇歳」にする
        headerRow.appendChild(th); // ヘッダー行に作成したセルを追加。
        console.log(headerRow);
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

    // 2. 定義した項目ごとに「行(tr)」と「セル(td)」を作る
    rowDefinitions.forEach(([label, className, rowId, defVal]) => {
        const tr = document.createElement('tr'); // 1行(<tr>)作成
        console.log(tr);
        if (className) tr.className = className; // スタイル用のクラス名があれば設定
        console.log(tr.className);
        // 行の左端（項目名）のセルを作成
        const tdLabel = document.createElement('td');
        console.log(tdLabel + '←チェックポイントC tdLabel');

        tdLabel.innerText = label;
        console.log(tdLabel.innerText + '←チェックポイントD tdLabel.innerText');

        tdLabel.className = 'sticky-col'; // CSSで左側に固定するためのクラス
        console.log(tdLabel.className + '←チェックポイントE tdLabel.className');

        tr.appendChild(tdLabel);
        console.log(tr + '←チェックポイントF tr');

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
                    ['total_income', 'total_expense', 'grand_balance'].includes(
                        rowId,
                    )
                ) {
                    td.id = `${rowId}-${col}`; // 後でJSから数字を書き換えるためにIDを振る
                    td.innerText = '0'; // 初期表示は0
                } else {
                    // ユーザーが数字を入力する「input」を作る
                    const input = document.createElement('input');
                    input.type = 'number'; // 数値入力専用
                    input.className = 'val'; // CSS用
                    input.dataset.row = rowId; // どの項目か（行の情報）を保持
                    input.dataset.col = col; // 何歳か（列の情報）を保持
                    input.value = defVal; // 初期値をセット
                    input.addEventListener('input', calculate); // 入力されたら即座に再計算
                    td.appendChild(input); // セルにinputを入れる
                }
                tr.appendChild(td); // 行にセルを追加
            }
        }
        tableBody.appendChild(tr); // テーブル本体に行を追加
    });
}

/**
 * 計算処理関数
 * すべての列を左から右へ順番に計算し、表示を更新します。
 */
function calculate() {
    let prevBalance = 0; // 前の年の残高を保持する変数（最初は0）

    // 0歳から100歳まで1列ずつループで計算
    for (let col = 0; col < COLUMN_COUNT; col++) {
        // 特定のセルの入力値を取得する補助関数
        const getVal = (rowId) => {
            // data-rowとdata-colが一致するinput要素を探す
            const el = document.querySelector(
                `[data-row="${rowId}"][data-col="${col}"]`,
            );
            return el ? parseFloat(el.value) || 0 : 0; // 数字があれば取得、なければ0
        };
        // debugger; // ★ ここでプログラムが止まる！
        // --- 1. その列（その年）の収入を合計 ---
        const initCash = getVal('init_cash'); // その年の初期/臨時収入
        const incomeNet = getVal('income_net'); // 手残り
        const incomeEtc = getVal('income_etc'); // その他
        const totalIncome = initCash + incomeNet + incomeEtc;
        // 収入合計セルに計算結果を表示
        document.getElementById(`total_income-${col}`).innerText =
            totalIncome.toLocaleString();

        // --- 2. その列（その年）の支出を合計 ---
        const expLife = getVal('exp_life');
        const expHouse = getVal('exp_house');
        const expEdu = getVal('exp_edu');
        const expCar = getVal('exp_car');
        const expEtc = getVal('exp_etc');
        const totalExpense = expLife + expHouse + expEdu + expCar + expEtc;
        // 支出合計セルに計算結果を表示
        document.getElementById(`total_expense-${col}`).innerText =
            totalExpense.toLocaleString();

        // --- 3. 累計残高を計算 ---
        // 前年までの貯金(prevBalance) + 今年の収入(totalIncome) - 今年の支出(totalExpense)
        const currentBalance = prevBalance + totalIncome - totalExpense;
        const balanceEl = document.getElementById(`grand_balance-${col}`);
        balanceEl.innerText = currentBalance.toLocaleString(); // 結果を表示

        // 残高がマイナスの場合は赤色、プラスの場合は緑色にする
        balanceEl.style.color = currentBalance < 0 ? '#dc3545' : '#28a745';

        // 今年の結果を「翌年のための前年残高」として上書き
        prevBalance = currentBalance;
    }
}

// --- ナビゲーションの「アクティブ表示」の処理 ---
// 現在表示しているファイル名（index2.html等）を取得
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
// ナビ内のリンクをすべて調べ、今のページと一致するボタンに「active」クラスを付ける
document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === currentFile) link.classList.add('active');
});

// --- 最後に実行 ---
initializeTable(); // テーブルを画面に作る
calculate(); // 最初の計算を1回実行する
