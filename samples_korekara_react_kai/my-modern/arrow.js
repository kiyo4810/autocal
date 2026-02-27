// function circle(radius) {
//   return (radius ** 2) * Math.PI;
// }

// const circle = (radius) => {
//   return (radius ** 2) * Math.PI;
// }

// （1）関数本体が 1 文である場合
// const circle = (radius) => (radius ** 2) * Math.PI;
const circle2 = (radius) => radius ** 2 * Math.PI;
console.log(circle2(8));

// （2）引数が 1 個の場合
const circle = (radius) => radius ** 2 * Math.PI;
console.log(circle(10));

// 引数がない場合
const show = () => console.log('Hello, World!!');
show();

// オブジェクトリテラルの場合。
const func = () => ({ title: '速習React', description: 'とてもいい本ですよ' });
console.log(func().title);
console.log(func().description);
