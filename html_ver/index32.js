//========================================================
//機能編   4-1-6 手書き風ロゴアニメーション
//========================================================

//SVGアニメーションの描画
var stroke;
stroke = new Vivus(
    'mask',
    {
        start: 'manual', //自動再生をせずスタートをマニュアルに
        type: 'scenario-sync', // アニメーションのタイプを設定
        duration: 5, // 描画速度（約1秒程度に調整）
        forceRender: false,
        animTimingFunction: Vivus.EASE,
    },
    function (obj) {
        // アニメーションが完了した時の処理
        // ロゴとスプラッシュエリアをフェードアウトさせる
        $('#splash_logo').fadeOut('slow');
        $('#splash').fadeOut('slow', function () {
            // フェードアウト完了後にメインコンテンツを表示するクラスを付与
            $('body').addClass('appear');
            // メイン画面内のアニメーション（スクロール等）を開始
            ScrollAnime();
        });
    },
);

//========================================================
//機能編   5-1-20クリックしたら円形背景が拡大（右上から）
//========================================================

$('.openbtn').click(function () {
    $(this).toggleClass('active');
    $('#g-nav').toggleClass('panelactive');
    $('.circle-bg').toggleClass('circleactive');
});

$('#g-nav a').click(function () {
    $('.openbtn').removeClass('active');
    $('#g-nav').removeClass('panelactive');
    $('.circle-bg').removeClass('circleactive');
});

//========================================================
// 印象編 8-5 テキストが流れるように出現（下から上）
//========================================================

function ScrollAnime() {
    $('.downAnime').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('slideAnimeDownUp');
            $(this).children('.downAnimeInner').addClass('slideAnimeUpDown');
        } else {
            $(this).removeClass('slideAnimeDownUp');
            $(this).children('.downAnimeInner').removeClass('slideAnimeUpDown');
        }
    });
}

$(window).scroll(function () {
    ScrollAnime();
});

//========================================================
// 関数をまとめる
//========================================================

$(window).on('load', function () {
    // ページ読み込み完了後にSVGアニメーションを開始
    stroke.play();
});
const hobby = 'dream';
const person = {
    name: '小西',
    age: 53,
    greeting: function () {
        return 'ようこそ芦屋へ';
    },
    const: 'const',
    'current city': 'Ashiya',
    3: 3.14,
    52.5: 52.5,
    1: 1,
    [hobby]: ['ganpura', 'walking Rokuroku', 'music'],
    0: 0,
};
console.log(person);
//オブジェクトにアクセスする方法は.か[]
console.log(person.name);
console.log(person.age);
//ラベルは文字列に変換される
console.log(person['name']);
console.log(person['age']);
console.log(person['current city']);
console.log(person['3']);
console.log(person[hobby][1]);
console.log(person['greeting']());

console.log('---A');
for (const key in person) {
    if (!Object.hasOwn(person, key)) continue;

    console.log(key);
    console.log(person);
    const element = person[key];
}
console.log('---B');
// 「Object」というobjectがある。グローバルオブジェクトに登録されている
// keysというメソッド。配列で返す
console.log(Object.keys(person));
// 配列で返すからkey ofが使える
for (const key of Object.keys(person)) {
    console.log(key);
}
console.log(Object.keys(person));
console.log(Object.values(person));
//ラベルが正の整数の順にならび、それ以外は書いた順にならぶ
console.log(Object.entries(person));

console.log('---C');
const goma = {
    realName: 'Goma',
    nickName: 'Cha-',
    age: 11,
    0: 0,
    // action: ()=> console.log("ツンデレ！"),
    action: () => 'ツンデレ！',
    isHealthy: true,
    1: 1.55,
    brownRate: 0.7,
};

console.log(Object.keys(goma));
console.log(Object.values(goma));
console.log(Object.entries(goma));
// goma.action();
console.log(goma.action());
goma.bd = '10/17'; //追加
goma.age = 12; //上書き変更
console.log('---D');
console.log(Object.entries(goma));
// console.logで表示される順番はブラウザに寄ってぜんぜん違う
console.log(goma);
delete goma[0];
delete goma.action;
console.log(goma);
console.log(Object.entries(goma));

console.log('---E');
const realName = 'Pan';
const nickName = 'Takkun';
const pan = {
    realName,
    nickName,
    age: 12,
    0: 0,
    // action: ()=> console.log("ツンデレ！"),
    action: () => 'ほんわか♥',
    isHealthy: false,
    1: 1.88,
    charactor: {
        happy: 'high',
        angry: 'low',
        friendly: 'middle',
    },
    brownRate: 0.98,
};

console.log(pan);
console.log('---F');

// const panCloneBadguy = pan; //そのままコピーすると全く一緒のものになる
const panCloneSimple = { ...pan };
console.log(panCloneSimple);

const panCloneBadguy = {
    age: 13, //下の行に上書きされる
    ...pan,
    isFat: true,
    charactor: { ...pan.charactor },
};
console.log(panCloneBadguy);
panCloneBadguy.charactor.angry = 'high';
console.log(pan === panCloneBadguy);
console.log(pan);

//Object.assign o1に結合されていく。要素を足していく。
console.log('---G Object.assignは');
const o1 = { a: 1 };
const o2 = { b: 2 };
Object.assign(o1, o2);
console.log(o1);
console.log(o2);

//Object.assign ingredientAに要素を足していく
const ingredientA = { sugar: 100 };
const ingredientB = { salt: 5 };
const ingredientC = { MSG: 'a bit' }; //下に書いたラベルで上書きされる
const ingredientD = { MSG: null, love: 'lot' };
// const ingredientE = {sugar: 200, salt: 20, MSG: 'a lot', love: null,soya: 15,}
Object.assign(ingredientA, ingredientB, ingredientC, ingredientD);
console.log(ingredientA); //↑で第一引数であるingredientAが上書きされる
console.log(ingredientB);
console.log(ingredientC);
console.log(ingredientD);

console.log('---G Object.assignで上書きせず別物を作る');
const newIngredientA = Object.assign({}, ingredientA);
console.log(newIngredientA);
console.log(ingredientA === newIngredientA);

console.log('---H 分割代入');

const objBook = {
    title: '猫の不思議',
    price: 15000,
    author: {
        penName: 'ちゃんやまちゃんみ',
        sex: 'male',
    },
    isbn: 1234567890,
    desc: 'ディスクリプションディスクリプションディスクリ、、、',
};

const arrayBook = [
    {
        title: '猫の不思議',
        price: 15000,
    },
    {
        title: 'ネコネコランド',
        price: 3000,
    },
    {
        title: '吾輩は猫である',
        price: 5000,
    },
];
// const bookTitle = objBook.title; //普通の代入
// ↓分割代入 title: bookTitleは変数名の書き換え。
// publisher = "CHANYAMA出版"で、まだないものの追加。
const {
    title: bookTitle,
    price,
    author: { penName, sex },
    publisher = 'CHANYAMA出版',
    ...etc
} = objBook;
console.log(bookTitle, price, penName, sex, publisher, etc);
console.log(objBook);

console.log('---H 分割代入。関数の引数に入れれるよ');
const sayBook = ({
    title: bookTitle,
    price,
    author: { penName, sex },
    publisher = 'CHANYAMA出版',
    ...etc
}) => {
    console.log(bookTitle, price, penName, sex, publisher, etc);
    console.log(objBook);
};
sayBook(objBook);

const [firstBook, secondBook] = arrayBook;
console.log(firstBook);
console.log(secondBook);
