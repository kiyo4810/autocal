// 1. サンプルとなる「元の配列」
const numbers = [1, 2, 3, 4, 5];
const books = [
    {
        isbn: '978-4-8156-1336-5',
        title: 'これからはじめるVue.js 3実践入門',
        price: 3740,
        summary:
            'JavaScriptフレームワーク「Vue.js」について解説した入門書です。',
        download: true,
    },
    {
        isbn: '978-4-297-14598-9',
        title: 'Rails アプリケーションプログラミング',
        price: 3960,
        summary:
            'Scaffolding機能から、ビュー／モデル／コントローラー開発、ルーティング、テスト、クライアントサイド開発まで、Railsの主要機能を徹底解説します。',
        download: true,
    },
    {
        isbn: '978-4-7981-8055-7',
        title: '独習ASP.NET Core',
        price: 4290,
        summary:
            'ASP.NET Coreの基本から、実践的・発展的内容まで、丁寧かつ網羅的に解説します。',
        download: true,
    },
    {
        isbn: '978-4-296-07070-1',
        title: '作って学べるHTML＋JavaScriptの基本',
        price: 2420,
        summary:
            'HTML＋JavaScriptを使って簡単なサンプルアプリを作りながら、Android／iPhoneの両方に対応したWebアプリを作成できる入門書です。',
        download: false,
    },
    {
        isbn: '978-4-627-85711-7',
        title: 'Pythonでできる! 株価データ分析',
        price: 2970,
        summary:
            '株に興味があるPythonプログラマーを対象に、Pythonを使った株価分析の手法を解説します。',
        download: false,
    },
];

// 2. map関数を使って「全ての数字を2倍にした新しい配列」を作る
// 読み方：numbersの中身を一つずつ取り出して「n」と呼び、n * 2 したものを新しい配列に入れる
const doubled = numbers.map((n) => n * 2);
const cirArea = numbers.map((n) => n * n * 3.14);

const div4 = document.getElementById('main4');
// 第一引数は絶対に関数！nだけじゃだめ！関数にする必要あり！
const bookList = books.map((n) => {
    const elem = document.createElement('div');
    elem.innerText = `全本：${n.title}`;
    div4.appendChild(elem);
    return elem.innerText;
});
const div5 = document.getElementById('main5');
// filter関数はtrueかfalseかを返し、trueだけを配列に詰め込む
const cheapBooks = books.filter((n) => {
    return n.price < 3500;
});
cheapBooks.forEach((n) => {
    const elem = document.createElement('div');
    elem.innerText = `安の本 中身：${n.summary}`;
    div5.appendChild(elem);
});
const div6 = document.getElementById('main6');
const sortBooks = books.sort((m, n) => {
    return m.price - n.price;
});
const bookList2 = books.map((n) => {
    const elem = document.createElement('div');
    elem.innerText = `価格順：${n.price}`;
    div6.appendChild(elem);
    return elem.innerText;
});

// const result1 = nums.match(regex1); //matchなので配列で返ってきてる
// const result2 = chars.match(regex2);
// const result3 = regex3.test(nums);
// const result4 = regex4.exec(nums);
// const result5 = chars.match(regex5);
// const result6 = chars.match(regex6);
// const result7 = chars2.replace(regex7, '代打川藤');
// const result8 = chars2.match(regex8);
// const result9 = chars.match(regex9);
// const result10 = chars.match(regex10);
// const result11 = chars3.match(regex11);
// const result12 = chars3.match(regex12);
// const result13 = chars3.match(regex13);
// const result14 = chars.match(regex11);
// const result15 = chars.match(regex12);
// const result16 = chars.match(regex13);

// // コンソール表示
console.log('元の配列', numbers);
console.log('２倍にした配列', doubled);
console.log('円の面積', cirArea);
console.log('mapですべて配列に', bookList);
console.log('filter安の本', cheapBooks);
console.log('Sort300円以下の本', sortBooks);
// console.log(result7);
// console.log(result8);
// console.log(result9);
// console.log(result10);
// console.log(result11);
// console.log(result12);
// console.log(result13);
// console.log(result14);
// console.log(result15);
// console.log(result16);

// // 画面表示
const div1 = document.getElementById('main1');
div1.innerText = numbers;
const div2 = document.getElementById('main2');
div2.innerText = doubled;
const div3 = document.getElementById('main3');
div3.innerText = `円の面積 ${cirArea}`;
// const div4 = document.getElementById('main4');
// div4.appendChild(elem);
// const div5 = document.getElementById('main5');
// div5.innerText = cheapBooks;
// const div6 = document.getElementById('main6');
// div6.innerText = '6. ' + result6;
// const div7 = document.getElementById('main7');
// div7.innerText = '7. ' + result7;
// const div8 = document.getElementById('main8');
// div8.innerText = '8. ' + result8;
// const div9 = document.getElementById('main9');
// div9.innerText = '9. ' + result9;
// const div10 = document.getElementById('main10');
// div10.innerText = '10. ' + result10;
// const div11 = document.getElementById('main11');
// div11.innerText = '11. ' + result11;
// const div12 = document.getElementById('main12');
// div12.innerText = '12. ' + result12;
// const div13 = document.getElementById('main13');
// div13.innerText = '13. ' + result13;
// const div14 = document.getElementById('main14');
// div14.innerText = '14. ' + result14;
// const div15 = document.getElementById('main15');
// div15.innerText = '15. ' + result15;
// const div16 = document.getElementById('main16');
// div16.innerText = '16. ' + result16;
