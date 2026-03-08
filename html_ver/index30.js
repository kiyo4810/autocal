const btn = document.getElementById('liBtn');
const ol = document.getElementById('names');
btn.addEventListener('click', async function () {
    e.preventDefault(); // ★これ！ブラウザの再読み込みを阻止します
    // awaitがないと、fetchは「約束(Promise)」だけ投げて次に進む
    const res = await window.fetch(
        'https://jsonplaceholder.typicode.com/users',
    );
    console.log(res);
    // resの中身はまだ空っぽ（Promise状態）なので、.json()なんて持ってない！と怒られる
    const users = await res.json();
    console.log(users);
    users.forEach((user) => {
        console.log(user.name);
        const li = document.createElement('li');
        li.innerText = user.name;
        ol.appendChild(li);
    });
});

// fetchを使って、文字化けを回避しながら中身を読み出す
fetch('index30.js')
    .then((response) => {
        // responseをtextとして受け取る際、明示的にUTF-8を指定した形になる
        return response.text();
    })
    .then((data) => {
        const display = document.getElementById('code-display');
        if (display) {
            display.textContent = data;
            // ★これを追加！読み込み完了後に色付けを実行します
            Prism.highlightElement(display);
        }
    })
    .catch((err) => console.error('ファイルの読み込みに失敗しました:', err));

let count = 9;
while (count < 10) {
    console.log(`カウンターA：${count}`);
    count++;
}

//最初の一回だけは問答無用で実行される
do {
    console.log(`カウンターB：${count}`);
    count++;
} while (count < 20);

// async function aaa() {
//     // awaitがないと、fetchは「約束(Promise)」だけ投げて次に進む
//     const res = await window.fetch(
//         'https://jsonplaceholder.typicode.com/users',
//     );
//     console.log(res);
//     // resの中身はまだ空っぽ（Promise状態）なので、.json()なんて持ってない！と怒られる
//     const users = await res.json();
//     console.log(users);
//     // while文でやる場合
//     // let count = 0;
//     // while (count<users.length) {
//       //   const user= users[count];
//       //   console.log(user.address.city);
//       //   count++;
//       // }
//       //　for文でやるばあい
//       for (let index = 0; index < users.length; index++) {
//         const user = users[index];
//         console.log(user.address.geo.lat);
//       }
//       //配列を反転させる
//       for (let j = 0, k = users.length - 1; j < k; j++, k--) {
//         [users[j], users[k]] = [users[k], users[j]]; //分割代入
//         console.log(j, k);
//       }
//       console.log(users);
//       //for ofは配列もしくは分割できるものを入れる
//       for (const user of users) {
//         console.log(user.id, user.name);
//       }
//       const letters = '石ノ森章太郎';
//       for (const letter of letters) {
//         console.log(letter);
//       }
//     }
//     aaa();

const hoge = {
    hoge: '下着',
    piyo: '靴下',
    fuga: '上着',
    hogera: 'Tシャツ',
    // hogera2: function (nurerumono) {
    //     return '濡れた' + nurerumono;
    // },
    hogehoge: 'ズボン',
};

for (const k in hoge) {
    console.log(k);
    console.log(hoge[k]);
    console.log(hoge.fuga);
}
const toys = ['miniCar', 'bat', 'ball'];
for (const key in toys) {
    //key(index)in Obj(arr)
    if (!Object.hasOwn(toys, key)) continue;

    const element = toys[key];
    console.log(toys);
    console.log(key);
    console.log(element);
    console.log(toys[1]);
}
try {
    console.log('try 1');
    throw 'error';
    // console.log(funcOhayo);
} catch (error) {
    // エラー出たときだけここを通る
    // エラー処理内はエラーがあってはならない。そのエラーで止まる
    // console.log(usoFunc);
    console.log('try2');

    try {
        console.log('try3');
        // console.log(ahoFunc);
        throw 'error';
    } catch (error) {
        console.log('try4');
    } finally {
        console.log('finally 絶対実行！');
    }
}
console.log('try5');

// セクション５。関数はオブジェクトにすぎない！

function add(a, b) {
    // console.log(a+b);
    return a + b;
}
add(4, 10);
console.log(add(5, 6));

console.log(add.name);
console.dir(add.length);

function abcd(a, b, c, d) {
    return a + b + c + d;
}
console.log(abcd(1, 2, 3, 4));
console.dir(abcd);
console.log(abcd.length);
console.log(abcd.name);

const person = {
    name: 'chanyama',
    // sayHi: function () {
    //   return 'はーい';
    // },
    // sayHi: ()=> 'およよ';
    sayHi() {
        return 'うほほ';
    },
};
console.log(person.sayHi());

let sayGoodbye = function (name) {
    console.log(name + '幼少期はこちら');
    return 'うほうほ';
};
console.dir(sayGoodbye);
console.log(sayGoodbye('ちゃんやま'));

// console.log(sayGoodbye.length);

// const sayCiao = function(){
//   return "ちゃお"
// }

// const sayCiao = () =>{
//   return "ちゃおちゃお"
// }
const sayCiao = () => 'ちゃおちゃおちゃお'; //これ、省略してるだけでリターンしてるよ

console.log(sayCiao());
