// メソッド,誰の持ち物？,目的,戻り値のイメージ
// test(),RegExp,チェック,true か false
// exec(),RegExp,詳細検索,詳細データ（配列っぽいもの）
// match(),String,抽出,見つかった文字の配列
// replace(),String,置換,置換した後の新しい文字列
const nums = '1234567890';
const chars = 'aaaabcc３２１456caaabc789';
const chars2 = '岡田掛布バース佐野岡田掛布バース佐野';
const chars3 = 'a1b';

// const regex = new RegExp('[^0-9]', 'g');
const regex1 = /[0-9]/g; // gはgrobal 全部探せ。gがなければ最初の文字で終了
// const regex2 = new RegExp("[0-9]",);
const regex2 = /abc/g; //文字列abcを探す。一回だけ。gをつければ全部
const regex3 = new RegExp('[a-z]+');
const regex4 = /[0-9]*/; //数字なら何でも。[]で囲むと「いずれか」の意味[abc]aかbかcのいずれか
const regex5 = /./g; //ドット。なんんんんでもいい。すべての文字の一文字探せ。g(global)つけたら全部探せ
const regex6 = /\d/g; //gがないと一文字目のアラビア数字探し出して終わり。
const regex7 = /佐野/g;
const regex8 = /^./; // ^は先頭の1文字 $は最後の1文字
const regex9 = /[pan]/g; //rかaかcかｋのいずれか（[]はいずれか）が最初に出るまで。gを入れたら全部
const regex10 = /a{2,4}/g; //波括弧の中の数字は「繰り返しの最小&最大回数」の範囲を指定しています。
const regex11 = /\D/g; //大文字にすることで「以外」を一回探す。、d（数字）以外、となる
const regex12 = /\D+/;
const regex13 = /\D*/;
// まとめ：使い分けのヒント
// 1文字ずつ処理したいなら、量指定子なしで g フラグを使う。
// 単語やカタマリとして抜き出したいなら、+ を使う。
// 「あってもなくても良い」という柔軟な検索なら、* を使う。

const result1 = nums.match(regex1); //matchなので配列で返ってきてる
const result2 = chars.match(regex2);
const result3 = regex3.test(nums);
const result4 = regex4.exec(nums);
const result5 = chars.match(regex5);
const result6 = chars.match(regex6);
const result7 = chars2.replace(regex7, '代打川藤');
const result8 = chars2.match(regex8);
const result9 = chars.match(regex9);
const result10 = chars.match(regex10);
const result11 = chars3.match(regex11);
const result12 = chars3.match(regex12);
const result13 = chars3.match(regex13);
const result14 = chars.match(regex11);
const result15 = chars.match(regex12);
const result16 = chars.match(regex13);

// コンソール表示
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
console.log(result6);
console.log(result7);
console.log(result8);
console.log(result9);
console.log(result10);
console.log(result11);
console.log(result12);
console.log(result13);
console.log(result14);
console.log(result15);
console.log(result16);

// 画面表示
const div1 = document.getElementById('main1');
div1.innerText = '1. ' + result1;
const div2 = document.getElementById('main2');
div2.innerText = '2. ' + result2;
const div3 = document.getElementById('main3');
div3.innerText = '3. ' + result3;
const div4 = document.getElementById('main4');
div4.innerText = '4. ' + result4;
const div5 = document.getElementById('main5');
div5.innerText = '5. ' + result5;
const div6 = document.getElementById('main6');
div6.innerText = '6. ' + result6;
const div7 = document.getElementById('main7');
div7.innerText = '7. ' + result7;
const div8 = document.getElementById('main8');
div8.innerText = '8. ' + result8;
const div9 = document.getElementById('main9');
div9.innerText = '9. ' + result9;
const div10 = document.getElementById('main10');
div10.innerText = '10. ' + result10;
const div11 = document.getElementById('main11');
div11.innerText = '11. ' + result11;
const div12 = document.getElementById('main12');
div12.innerText = '12. ' + result12;
const div13 = document.getElementById('main13');
div13.innerText = '13. ' + result13;
const div14 = document.getElementById('main14');
div14.innerText = '14. ' + result14;
const div15 = document.getElementById('main15');
div15.innerText = '15. ' + result15;
const div16 = document.getElementById('main16');
div16.innerText = '16. ' + result16;
