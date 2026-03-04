'use strict';
// console.log('aaaaa');
// alert('good afternoon');
let count = 5;
console.log(count);

count = 30;
console.log(count);

let newCount = 0;

const daysInWeek = 7;
console.log(daysInWeek);
// daysInWeek = 8;
let tomatoCount;
let tonatocount;
let $tomatoCount;
let _tomatoCount;
let __tomatoCount;
let tomatoCount7;
let add = 2 * 4;
console.log(add);
let amari = 9 % 2;
console.log(amari);
let r = 5;
let menseki = r ** 2 * 3.14;
console.log(menseki);
let result = menseki;
result = result + 10;
console.log(result);
result -= 10;
console.log(result);
result++;
console.log(result);
result += 100;
console.log(result);
result *= result;
console.log(result);
let a = 5;
a += a;
console.log(a);
a = a ** a;
console.log(a);
let b = 5;
b *= 15;
console.log(b);
b = 4;
b += 1;
console.log(b);
b++;
console.log(b);
console.log(b++); //1を足す前の値を返している。返したあと1を足している
console.log(b);
console.log(++b); //1を足してから値を返している。
console.log(b);
let string = `ああ、\n頭皮
\'痒\\\い`;
const userName = 'Yoshipi' + string + "''''``'``";
console.log(userName);
console.log(b + a);
console.log(a - b);
let c = '30';
console.log(c + a);
console.log(c - a);
console.log(c * a);
console.log(a / c);
console.log(a % c);
console.log(a ** c);
let oyoyo = string * c;
console.log(oyoyo);
console.log(typeof oyoyo);
const userInput = '52.8';
// ■■文字列を数値に。4種の方法あり
// let calcResult = Number(userInput)+1973;
// let calcResult= parseInt(userInput) + 1973+48;
// let calcResult = parseFloat(userInput)-20;
let calcResult = +userInput;
console.log(calcResult);

// ■■数値を文字列に
const myBD = 19731017;
// let myBdString = String(myBD);
let myBdString = myBD.toString();
console.log(myBdString);

// 真偽値
let boolean = true;
console.log(boolean);
boolean = false;
console.log(boolean);

// 配列
let array = ['apple', 'orange', 'grape', 'peach', 'pine'];
array = ['nuts', 1, true, array];
console.log(array);
console.log(array[3][2]);
console.log(array[3][1]);
array = [];
array.push('apple');
console.log(array);

// オブジェクト
const coffee = {
    name: 'Chololate Mocha',
    size: 350,
    isHot: true,
    toppings: ['Cinammon', 'Caramel'],
    nutritions: {
        calories: 430,
        sugar: 53,
    },
};
console.log(coffee);
console.log(coffee.nutritions.sugar);
coffee.isHot = false;
console.log(coffee.isHot);
coffee.barista = 'ちゃんやま';
coffee.staff = 'ごま';
console.log(coffee);

// nullとundefinedについて
let userInfo = null;
console.log(typeof userInfo);
console.log(userInfo); //nullは予定通りなにもない。明示的に何もないのを表すならnull
userInfo = undefined;
console.log(userInfo); //undefinedは予期せぬ何もない状態。エラーが多い
console.log(typeof userInfo); //undefinedは「undefined」という型

// 関数について
function addEasy(num1, num2) {
    //パラメーター。仮引数
    console.log(num1 + num2);
    return num1 + num2;
    console.log('ほげほげ'); //リターンのあとはすべて無効
}
const value = addEasy(4, 7);
console.log(value);

addEasy(3, 4); //引数。argument議論。実態。根拠
addEasy(5, 3);
addEasy(555, 333);
addEasy(673, 3);
