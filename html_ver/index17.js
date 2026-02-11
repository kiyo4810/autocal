const logArea = document.getElementById('log');

// ログを表示する関数
function addLog(e) {
    const message = `イベントが発生！→「${e.type}」、そしてターゲットは→「${e.target}」`;
    const div = document.createElement('div');
    div.textContent = message;
    logArea.prepend(div);
    console.log(e);
}

// --- 1. マウスイベント ---
const mouseBox = document.getElementById('mouseBox');
mouseBox.addEventListener('click', (e) => {
    console.dir(e);
    addLog(e);
    mouseBox.classList.toggle('active');
});

// 「挨拶をした後に、預かった関数を実行する」という関数
function sayHello(callback) {
    console.log('こんにちは！');
    callback(); // 預かった関数を実行
}

// 実行
sayHello(() => {
    console.log('預けていた関数が動きました。');
});

// コールバック関数１トイレでうんこ
function toilet(unkoback) {
    console.log('うんこがでたよ');
    unkoback();
}
toilet(() => {
    console.log('トイレを出たよ');
});

// コールバック関数２ 料理と片付け
function cooking(cookback) {
    console.log('料理を出しました');
    cookback();
}
cooking(() => {
    console.log('洗い物をします');
});

// コールバック関数３ 足し算のあとの数字変更後の掛け算
function calc(calcback) {
    let a = 10;
    let b = 5;
    console.log(a + b);
    calcback();
}
calc(() => {
    a = 7;
    b = 6;
    console.log(a * b);
});

// コールバック関数４ 朝です。顔を洗います
function alarm(alamback) {
    console.log('朝ですよ！');
    alamback();
}
alarm(() => {
    console.log('顔を洗います');
});

// コールバック関数５ 計算した結果をコールバックする関数の引数にきよ回答
function moreCalc(numA, CB) {
    let dbl = numA * 2;
    console.log(dbl);
    CB(dbl);
}
moreCalc(5, (val) => {
    console.log(`計算結果は ${val} だよね`);
});

// コールバック関数５ 計算した結果をコールバックする関数の引数にAI回答
function getDouble(num, callback) {
    let result = num * 2;
    callback(result);
}
getDouble(5, (value) => {
    console.log('結果は' + value + 'です');
});

// コールバック関数6-1 三角形の計算１

function getTri(nA, nB, CB) {
    let triArea = (nA * nB) / 2;
    CB(triArea, nA, nB);
}
getTri(4, 10, (area, base, height) => {
    console.log(`底辺${base}かける高さ${height}割る２の${area}が面積です`);
});

// コールバック関数6-２ 三角形の計算２
let numA2 = 6;
let numB2 = 10;

function getTri2(cb2) {
    let tri = (numA2 * numB2) / 2;
    cb2(tri);
}
// 引数に関数が入っている
getTri2((area) => {
    console.log(`底辺${numA2}かける高さ${numB2}割る２の${area}が面積です`);
});

function getTri3(nA, nB, CB) {
    let triArea3 = (nA * nB) / 2;
    CB(nA, nB, triArea3);
}
getTri3(100, 500, (tei, taka, area) => {
    console.log(`底辺${tei}かける高さ${taka}割る２の${area}が面積です`);
});

setTimeout(() => {
    console.log('3秒後にこんにちは！');
}, 3000);

const sound = new Audio('./images/dq_level_up.mp3');
let isSurprised = false;
document.getElementById('nanika').addEventListener('click', (e) => {
    if (isSurprised != false) {
        // 2. 音を再生する
        sound.currentTime = 0; // 連続クリックされても最初から鳴るようにリセット
        sound.play();
        e.currentTarget.innerHTML = `
        <div style="text-align: center;">
            <p>やっほーー！びっくりした？</p>
            <img src="./images/kiyo.png" style="width: 100px; height: auto;">
        </div>
    `;
        isSurprised = false;
        addLog(e);
    } else {
        e.currentTarget.innerHTML = `
        <div style="text-align: center;">
            <p>🐒クリックするとなにかがおこる、、、、🐵</p>
        </div>
    `;
        isSurprised = true;
        addLog(e);
    }
});
