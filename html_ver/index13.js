let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array);
let barabara = [...array];
console.log(barabara);

console.log(array === barabara); // 結果は false（別物と判定される）
const arrayId = document.querySelector('#arraycal');
const h1 = document.querySelector('h1');
arrayId.textContent = barabara;
// document.body.appendChild(arrayId);
h1.after(arrayId);
// console.log(...array);
// let addafter = [...array, 10];
// console.log(addafter);

// fetchメソッドについて
// https://www.youtube.com/watch?v=pzIxzegWVu8
fetch('./db.json')
    .then((response) => {
        console.log(response);
        // console.log(response.json());
        return response.json();
    })
    .then((data) => {
        console.log(data);
        let desc = data.categories[0].description;
        const h2 = document.querySelector('h2');
        h2.textContent = desc;
        let cont = data.posts[1].content;
        const h3 = document.querySelector('h3');
        h3.textContent = cont;
        const a = document.createElement('a');
        a.textContent = data.posts[4].excerpt;
        a.href = 'https://finance.yahoo.com/quote/VTI/';
        a.target = '_blank';
        document.querySelector('h4').appendChild(a);
    })
    .catch((error) => {
        console.log(error);
    });
