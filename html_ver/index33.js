// コードを画面表示fetchを使って、文字化けを回避しながら中身を読み出す
fetch('index33.js')
    .then((response) => {
        // responseをtextとして受け取る際、明示的にUTF-8を指定した形になる
        return response.text();
    })
    .then((data) => {
        const display = document.getElementById('code-display');
        if (display) {
            display.textContent = data;
            // ★これを追加！読み込み完了後に色付けを実行します
            Prism.highlightElement(display);
        }
    })
    .catch((err) => console.error('ファイルの読み込みに失敗しました:', err));

///////////////////////////
//配列の学習ここから
///////////////////////////

let fruits = ['りんご', 'ばなな', 'なし'];
// console.log(fruits.push('なし'));
// fruits.push('なし');
console.log(fruits);

let arrayLikeFruits = {
    0: 'apple',
    1: 'banana',
    2: 'pear',
    length: 3,
};
console.log(arrayLikeFruits);
