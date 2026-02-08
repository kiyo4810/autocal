const result = document.querySelector('#result');
function countUpNum(max = 10) {
    let value = 0;
    for (let index = 0; index < max; index++) {
        let element = `<li>${index}番目ね</li>`;
        result.insertAdjacentHTML('beforeend', element);
        value += index;
        console.log(value);

        // result.innerHTML = element;
    }
    console.log(value);
    // window.alert('でるぞ！');
    return value;
}
// countUpNum();
let v = countUpNum();
// alert(v);

// ここから別の人の動画練習
const wrapDiv = document.querySelector('#wrap');
function message(name) {
    let inDiv = document.createElement('div');
    let sentence = `あなたは${name}ですね`;
    inDiv.innerHTML = sentence;
    console.log(sentence);
    wrapDiv.appendChild(inDiv);
}
message('なかぱん');
message('ちゃんやま');
message('Timothy');
console.log('わわわわーん');

const calDiv = document.querySelector('#cal');
function calc(numA, numB) {
    let newDiv = document.createElement('div');
    console.log(newDiv);
    newDiv.classList.add('cal');
    let calTriangle = (numA * numB) / 2;
    newDiv.innerHTML = `${numA}かける${numB}割る２は${calTriangle}です。`;
    document.body.appendChild(newDiv);
    console.log(newDiv);

    return calTriangle;
}
console.log(calc(4, 5));
console.log(calc(5, 33));

// ここからまた別の人の動画 Web Dev Simplified
const parent2 = document.querySelector('.parent2');
console.log(parent2);
console.log(parent2.children[3]);
document.body.appendChild(parent2.children[3]);
