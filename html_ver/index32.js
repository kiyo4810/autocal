'use strict';
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

//========================================================
// day6ここから オブジェクトを扱う。
//========================================================

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

console.log('---A.');
for (const key in person) {
    if (!Object.hasOwn(person, key)) continue;

    console.log(key);
    console.log(person);
    const element = person[key];
}
console.log('---B.');
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

console.log('---C.');
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
console.log('---D.');
console.log(Object.entries(goma));
// console.logで表示される順番はブラウザに寄ってぜんぜん違う
console.log(goma);
delete goma[0];
delete goma.action;
console.log(goma);
console.log(Object.entries(goma));

console.log('---E.');
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
console.log(pan.action?.()); //actionがなければエラーじゃなくundefinedを返す。あるからエラーにならない

console.log('---F.');

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
console.log('---G. Object.assignは');
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

console.log('---G. Object.assignで上書きせず別物を作る');
const newIngredientA = Object.assign({}, ingredientA);
console.log(newIngredientA);
console.log(ingredientA === newIngredientA);

console.log('---H. 分割代入');

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
        say: () => 'やっぱこれっしょ',
    },
    {
        title: 'ネコネコランド',
        price: 3000,
        say: () => 'いいですねぇ！',
    },
    {
        title: '吾輩は猫である',
        price: 5000,
        say: () => 'すばらしお！',
    },
];
console.log(arrayBook[2].sayhah?.()); //sayはあるけどsayhahはあったっけな?だから?をつけておこう

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
console.log(objBook.price);

console.log('---H. 分割代入。関数の引数に入れれるよ');
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

console.log('---I. in演算子。true falseを返す');

console.log('author' in objBook);
// console.log(objBook.title !== undefined);

// if (objBook.title !== undefined) {
if ('title' in objBook) {
    console.log('オブジェクトはあるよ');
} else {
    console.log('オブジェクトはないよ');
}

console.log('---J. オプショナルチェイニング');
let user = undefined;
user = null;
console.log(user?.address); //userがnullかundefinedならundefinedを返す

let [firstBook2, secondBook2] = arrayBook;
console.log(firstBook2);
console.log(secondBook2);
firstBook2 = null;
console.log(firstBook2?.title); //firstBook2がnullかundefinedならundefinedを返す

console.log('---K. this');

console.log(Object);
console.log(this);
console.log('---L. this');

let sayThis = function () {
    console.log(this);
};
const car = {
    color: 'red',
    sayThis,
    changeColor: function (color) {
        this.color = color; //car.color = color;だとこのオブジェクトのクローンを作ったときに以下の結果が変化しバグとなる
    },
};
const car2 = { ...car };
car2.changeColor('white');
console.log(car2);
console.log(car);

const sayThisArrow = () => console.log(this);
sayThisArrow(); //アロー関数はthisを一切持たない。global objectになる

const myThis = function (a, b) {
    console.log(this, a, b);
};
myThis.call({ kind: 'man' }, 1, 3); //第一引数をthisにする。第二第三は個別にここではthisはwindowになる
// myThis.call({hi: 'hello'});
myThis.apply({ temp: 30 }, [5, 3]); //第一引数をthisにする。第二第三は配列で

const pastaCal = {
    servingSize: 60,
    member: 4,
    total() {
        // ⇐ total: function() の省略形
        return pastaCal.servingSize * pastaCal.member;
    },
};
console.log(pastaCal.total());
console.log(pastaCal.prototype);

const obj = {
    a: 1,
    b: 2,
};
console.log(obj);

// const user1={
//   name: 'きよ',
//   age: 52,
//   greeting(){},
// }
// const user2={
//   name: 'あき',
//   age: 42,
//   greeting(){},
// }
// const user3={
//   name: 'ゆきこ',
//   age: 65,
//   greeting(){},
// }

// const UserFactory =(name,age)=>{
//   return{
//     name,
//     age,
//     greeting(){return "hi,guys"},
//   };
// };

// const user1 = UserFactory("Kiyo",52);
// const user2 = UserFactory("Aki",42);
// const user3 = UserFactory("Yukiko",60);
// console.log(user1.greeting());
// console.log(user2);
// console.log(user3);

const UserFactory = (name, age, greeting) => {
    return {
        name,
        age,
        greeting,
    };
};

// // 1. Kiyoさん：標準的な挨拶（普通の関数を渡す）
// const user1 = UserFactory('Kiyo', 52, function () {
//   return `こんにちは、${this.name}です！`;
// });

// // 2. Akiさん：英語でクールに（アロー関数を渡す）
// // ※アロー関数の場合は this.name が使えないので直接名前を入れるか工夫が必要
// const user2 = UserFactory('Aki', 42, function () {
//   return `Hey, ${this.name}! what's up?`;
// });

// // 3. Yukikoさん：芦屋スタイル
// const user3 = UserFactory('Yukiko', 60, function(){
//   return `私、${this.name}でございます。ごきげんよう。`;
// });

// console.log(user1.name + ': ' + user1.greeting()); // Kiyo: こんにちは、Kiyoです！
// console.log(user2.name + ': ' + user2.greeting()); // Aki: Hey, what's up?
// console.log(user3.name + ': ' + user3.greeting()); // Yukiko: ごきげんよう。

//ここからはクラスを使って

const UserConstructor = function (name, age) {
    // new を入れると this ={} 暗黙的に空っぽのオブジェクトthisが生成される
    this.name = name;
    this.age = age;
    this.greeting = function () {};
    // new を入れると 暗黙的にreturn this;をする
};

const user1 = new UserConstructor('Kiyo', 52);
const user3 = new UserConstructor('Yukiko', 60);
const user2 = new UserConstructor('Aki', 42);

console.log(user1);
console.log(user2);
console.log(user3);
//========================================================
//ここからクラス！
//========================================================
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greeting() {}
    post() {}
} //function User{}とほとんど一緒。classスタートするとnewが必須
const User11 = new User('ぶるきよ', 500);
console.dir(User11);
