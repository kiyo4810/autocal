const logArea = document.getElementById('log');

// ログを表示する関数（修正版）
function addLog(e) {
    // 1. ターゲットが持っている情報を整理
    const tagName = e.target.tagName;
    // 2. キー入力があれば表示、なければ空
    const keyInfo = e.key ? ` (${e.key})` : '';
    // 3. input要素ならvalue、それ以外なら固定テキストなど
    const targetInfo =
        e.target.id === 'mouseBox' ? '操作ボックス' : e.target.tagName;

    const msg = `イベント: ${e.type.padEnd(10)} | 対象: ${targetInfo}${keyInfo}`;

    const div = document.createElement('div');
    div.textContent = msg;
    logArea.prepend(div);
    console.log(e);
}

// --- 1. マウスイベント ---
const mouseBox = document.getElementById('mouseBox');

mouseBox.addEventListener('click', (e) => {
    addLog(e);
    mouseBox.classList.toggle('active');
});

mouseBox.addEventListener('mouseover', (e) => {
    // 順序：ログを先に取ってから文字を変える
    addLog(e);
    mouseBox.textContent = 'マウス乗ったよ！';
});

mouseBox.addEventListener('mouseout', (e) => {
    addLog(e);
    mouseBox.textContent = 'マウス外れたよ！';
});

// --- 2. キーボードイベント ---
const keyInput = document.getElementById('keyInput');
const keyDisplay = document.getElementById('keyDisplay');

keyInput.addEventListener('keydown', (e) => {
    addLog(e);
    keyDisplay.textContent = e.key;
});

keyInput.addEventListener('input', (e) => {
    addLog(e);
    // inputイベントでは e.key が使えないので inputType などをコンソールで見るのが正解です
});

// --- 3. フォームイベント ---
const sampleForm = document.getElementById('sampleForm');
sampleForm.addEventListener('submit', (e) => {
    //フォームが送信時画面リセットされるのを防ぐおまじない
    e.preventDefault();
    addLog(e);

    const selectedText =
        sampleForm.fruitSelect.options[sampleForm.fruitSelect.selectedIndex]
            .text;
    document.getElementById('formAns').innerText = selectedText + 'ですよ';
});

// --- 4. ウィンドウイベント ---
window.addEventListener('load', (e) => {
    console.log('ページの読み込みが完了しました！');
});
