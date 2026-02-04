const div = document.querySelector('.div');
console.log(div);
div.id = 'div1';
div.classList.add('6-3');
div.classList.remove('div');

const div2 = document.createElement('div');
div2.id = 'div2';
div2.classList.add('my-class');
div2.innerHTML = 'ららら';
document.body.appendChild(div2);

const item = document.querySelector('#itemTwo');
console.log(item);

const lis = document.querySelectorAll('.item');
for (let index = 0; index < lis.length; index++) {
    console.log(lis[index]);
}

const ul = document.querySelector('.items').children;
console.log(ul);

// const b = document.querySelector('#bId');
// console.log(b);
const newDiv3 = document.createElement('div3');
newDiv3.innerHTML = '鳥人！ by WM';
newDiv3.classList.add('waraimeshi');
document.body.appendChild(newDiv3);

// const fruits = document.querySelector('.fruits');
// console.log(fruits);
const fruit = document.querySelectorAll('.fruit');
console.log(fruit);
for (let index = 0; index < fruit.length; index++) {
    const copy = fruit[index].cloneNode(true);
    document.body.appendChild(copy);
}

// ■■モーダルを作る■■
const modal = document.createElement('div');
modal.classList.add('modal');
const inner = document.createElement('div');
inner.classList.add('inner');
modal.appendChild(inner);

const btn = document.querySelector('.btn');
console.log(btn);
btn.addEventListener('click', function () {
    document.body.appendChild(modal);
});
