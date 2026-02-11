const logArea = document.getElementById('log');

// ログを表示する関数
function addLog(e) {
    const msg = `イベント発生: ${e.type} | ターゲット: ${e.target.tagName}の${e.target.innerText || ''}${e.key || ''}`;
    const div = document.createElement('div');
    div.textContent = msg;
    logArea.prepend(div);
    console.log(e); // ブラウザのコンソールで詳細を確認！
}

// --- 1. マウスイベント ---
const mouseBox = document.getElementById('mouseBox');
mouseBox.addEventListener('click', (e) => {
    addLog(e);
    mouseBox.classList.toggle('active');
});
// --- 1. マウスイベント (mouseoutを追加) ---
mouseBox.addEventListener('mouseout', (e) => {
    addLog(e);
    // マウスが離れたら色を戻すなどの処理もできます
    mouseBox.textContent = 'マウス外れたよ！';
});

// ついでに mouseover の方も書き換えると変化がわかりやすいです
mouseBox.addEventListener('mouseover', (e) => {
    addLog(e);
    mouseBox.textContent = 'マウス乗ったよ！';
});

// --- 2. キーボードイベント ---
const keyInput = document.getElementById('keyInput');
const keyDisplay = document.getElementById('keyDisplay');
keyInput.addEventListener('keydown', (e) => {
    addLog(e);
    keyDisplay.textContent = e.key; // e.keyでどのキーか取得
});

// --- 3. フォームイベント ---
const sampleForm = document.getElementById('sampleForm');
sampleForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ★重要！ページのリロードを止める
    alert('フォーム送信をキャンセルしました（preventDefaultの効果）');
    const index = e.currentTarget.fruitSelect.selectedIndex;
    const selectedText = e.currentTarget.fruitSelect[index].textContent;
    const formAns = document.getElementById('formAns');
    formAns.innerText = selectedText + 'ですよ';
    console.log(selectedText + 'ですよ');

    addLog(e);
});

// --- 4. ウィンドウイベント ---
window.addEventListener('load', (e) => {
    console.log('ページの読み込みが完了しました！');
});
