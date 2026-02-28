// const regex = new RegExp('[^0-9]', 'g');
const regex = /[0-9]*/g;
console.log(regex);
const nums = '01234567890';
const result = nums.match(regex);
console.log(result);

const div = document.getElementById('main1');
div.innerText = result;

const seikihyogen = new RegExp('[a-z]+');
result2 = seikihyogen.test('abc');
const div2 = document.getElementById('main2');
div2.innerText = result2;

result3 = seikihyogen.test('123');
const div3 = document.getElementById('main3');
div3.innerText = result3;
