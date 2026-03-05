// 'use strict';
const inFunc1 = 'るるる';
const value = addEasy(4, 7);
console.log(value);

// 関数について。関数宣言は巻き上げられる。上に行くから実行が先でも大丈夫
function addEasy(num1, num2) {
    //パラメーター。仮引数
    console.log('num1:', num1, 'num2:', num2);
    console.log({ num1: num1, num2: num2 }); //省略なし。あまりよろしくない
    console.log({ num1, num2 }); //省略記法
    console.warn({ num1, num2 }); //省略記法
    console.error({ num1, num2 }); //省略記法

    // console.log(num1,num2);

    const inFunc1 = 'れれれ';
    const inFunc2 = 'りりり';
    // hello();
    // console.log(inFunc2);
    console.log(inFunc1);

    return num1 + num2;
    const inFunc = 'ららら'; //リターンのあとはすべて無効
    console.log(inFunc); //リターンのあとはすべて無効
}

// console.log(inFunc2); //ローカル変数はグローバル下で表示できない
// コメント１
/* コメント２ */

// キーボードショートカット（しらなかったもの）
// cmd + shift + z やっぱ進む
// 選択後 cmd + d で同じワード選択
// cmd + opt + → 右のタブに行く
// debugger;
// オブジェクト
const coffee = {
    name: 'Chololate Mocha',
    size: 350,
    isHot: true,
    toppings: ['Cinammon', 'Caramel'],
    nutritions: {
        calories: 430,
        sugar: 53,
        artiColor: ['red', 'green', 'black'],
    },
};
console.log(coffee.nutritions);
console.log(coffee.isHot);
// console.log(addEasy(44, 9));
console.table(coffee);
