// const regex = new RegExp('[^0-9]', 'g');
const regex = /[0-9]$/g;
console.log(regex);
const nums = '01234567890';
const result = nums.match(regex);
console.log(result);

const div = document.getElementById('main');
div.innerText = result;
