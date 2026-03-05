'use strict';
const inFunc4 = 'るるる';
const value = addEasy(4, 7);
console.log(value);

// 関数について。関数宣言は巻き上げられる。上に行くから実行が先でも大丈夫
function addEasy(num4, num2) {
    //パラメーター。仮引数
    console.log(num4 + num2);
    const inFunc2 = 'りりり';
    const inFunc4 = 'れれれ';
    // console.log(inFunc2);
    console.log(inFunc4);

    return num4 + num2;
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
