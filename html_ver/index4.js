'use strict';
{
    // オブジェクトを生成
    const person = {
        name: ['かとう', 'しむら'],
        age: 70,
        gender: 'male',
        interests: ['おんがく', 'さんすう'],
        bio: function () {
            alert(
                `${this.name[0]}、${this.name[1]} は ${this.age} 歳です。 趣味は ${this.interests[0]} と ${this.interests[1]}です。`,
            );
            return '自己紹介おわり';
        },
        getNextAge: function () {
            return this.age + 1;
        },
        checkAdult: function () {
            if (this.age > 65) {
                document.getElementById('adultcheck').innerText =
                    '受給資格あり！';
                return '受給OK';
            } else {
                document.getElementById('adultcheck').innerText =
                    '受給資格なし！';
                return '受給NG';
            }
        },
    };
    console.log(person.bio());
    console.log(person.getNextAge());
    // これを追加！
    console.log(person.checkAdult());

    // person.bio();

    // これは配列✖️
    // const person = [

    // ];

    class Position {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    let Pos = new Position(3, 5);
    console.log(Pos);
}

// // アロー関数練習
// // 普通の関数
// let keisan = function (x, y) {
//     return x + y;
// };
// // アロー関数で短く
// console.log(keisan(5, 3));
// let keisan2 = (x, y) => {
//     return x * y;
// };
// console.log(keisan2(7, 3));
// // アロー関数のルールでもっと短くできます。処理が1行なら{}を省略できる
// let keisan3 = (x, y) => x * y;
// console.log(keisan3(7, 8));

function tashizansuzzo() {
    alert('たしざんすっぞ');
}
tashizansuzzo();

function tashizan(a, b) {
    return a + b;
}
tashizan(5, 333);

console.log(tashizan(5, 333));

const heytashizan = () => {
    console.log('ヘイ足し算すんぞ');
};
heytashizan();

const tashizanhensu = (a, b) => a + b;
console.log(tashizanhensu(55, 3));
// tashizanhensu();

const fruit = ['りんご', 'ばなな', 'みかん'];
const f1 = fruit[0];
console.log(f1);

const [fa, fb, fc] = ['りんご', 'ばなな', 'みかん'];
document.getElementById('fruits').textContent = `${fa}と${fb}と${fc}`;
console.log(fc);

let anum = 4;
let bnum = 6;
function multi(a, b) {
    return a * b;
}
console.log(multi(anum, bnum));
document.getElementById('mab').textContent = multi(anum, bnum);

let cnum = 5;
let dnum = 8;
const multi2 = (c, d) => {
    return c * d;
};
console.log(multi2(cnum, dnum));
document.getElementById('mcd').textContent = multi2(cnum, dnum);
