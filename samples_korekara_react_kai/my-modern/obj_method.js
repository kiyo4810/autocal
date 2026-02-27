// const member = {
//   name: '佐藤理央',
//   greet: function() {
//     console.log(`こんにちは、${this.name}さん！`);
//   }
// }

// const member = {
//   name: '佐藤理央',
//   greet() {
//     console.log(`こんにちは、${this.name}さん！`);
//   }
// }

// member.greet();

const staff = {
    name: 'ちゃんやま',
    greeting: function () {
        console.log('このやろばかやろ！');
    },
};
console.log(staff);

// const staff = {
//     name: 'ちゃんやま２',
//     greeting() {
//         console.log('ばかやろう２');
//     },
// };

// const staff = {
//     name: 'ちゃんやま２',
//     greeting: () => {
//         console.log('ばかやろう２');
//     },
// };

console.log(staff);

// ① staff.greeting() が呼ばれる
// 関数の中にある console.log('ばかやろう２') が実行され、コンソールに文字が出ます。
// ② greeting() 関数が終了する
// この関数は return（戻り値）を書いていないので、JavaScriptのルールで undefined を返します。
// ③ 外側の console.log(...) が実行される
// ②で返ってきた undefined を表示します。
// console.log(staff.greeting());// これではエラーになる。
staff.greeting(); //単純にオブジェクトのプロパティーを呼べばそこには関数があるのでログが出る
