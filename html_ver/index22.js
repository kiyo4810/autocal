// メソッド,誰の持ち物？,目的,戻り値のイメージ
// test(),RegExp,チェック,true か false
// exec(),RegExp,詳細検索,詳細データ（配列っぽいもの）
// match(),String,抽出,見つかった文字の配列
// replace(),String,置換,置換した後の新しい文字列
const nums = '1234567890';
const chars = 'aaabcc３２１456c';
const chars2 = '岡田掛布バース佐野岡田掛布バース佐野';

// const regex = new RegExp('[^0-9]', 'g');
const regex1 = /[0-9]/g; // gはgrobal 全部探せ。gがなければ最初の文字で終了
// const regex2 = new RegExp("[0-9]",);
const regex2 = /abc/;
const regex3 = new RegExp('[a-z]+');
const regex4 = /[0-9]*/;
const regex5 = /./g; //ドット。なんんんんでもいい。すべての文字の一文字探せ。g(global)つけたら全部探せ
const regex6 = /\d/g; //gがないと一文字目のアラビア数字探し出して終わり。
const regex7 = /佐野/g;

const result1 = nums.match(regex1);
const result2 = chars.match(regex2);
const result3 = regex3.test(nums);
const result4 = regex4.exec(nums);
const result5 = chars.match(regex5);
const result6 = chars.match(regex6);
const result7 = chars2.replace(regex7, '代打川藤');

// コンソール表示
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
console.log(result6);
console.log(result7);
// console.log(result8);
// 画面表示
const div1 = document.getElementById('main1');
div1.innerText = result1;
const div2 = document.getElementById('main2');
div2.innerText = result2;
const div3 = document.getElementById('main3');
div3.innerText = result3;
const div4 = document.getElementById('main4');
div4.innerText = result4;
const div5 = document.getElementById('main5');
div5.innerText = result5;
const div6 = document.getElementById('main6');
div6.innerText = result6;
const div7 = document.getElementById('main7');
div7.innerText = result7;
// const div8= document.getElementById('main8');
// div8.innerText = result8;
