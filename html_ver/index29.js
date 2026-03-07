let tall = 176,
    weight = 88,
    face = 'nice',
    chara = 'bad';
console.log(tall, weight, face, chara);

let a = 1;
let b = (a++, a++, a++); //
console.log(b);
console.log(a);

let c = 52;
let d = (++c, c++);
console.log(d);
console.log(c);

const reportAndCalc = (num) => {
    (console.log(`${num}回目の処理ですよ`), num++, num * 2);
};
console.log(reportAndCalc(6));

const karaMoji1 = 0;
// || は 「偽（Falsy）な値」 すべてを弾いてしまいます。
// 0（数値のゼロ）
// ""（空文字）
// false（偽）
//Kiyoなどのユーザーネームがあればそれを返す。空欄ならUser Aを返す
console.log(karaMoji1 || 'User A');

//null合体演算子
//0や''(空文字)と文字、数字他何でもそれを返すが、nullやundefinedならUserBを返す
//テレビのボリューム０や残高０など
const karaMoji2 = '';
console.log(karaMoji2 ?? 'userB');

let ok = !true;
ok = undefined;
ok = null;
ok = !!0; // !! ビックリマーク２回で値を真偽値に変換
// ok = "wahaha";
// ok =!'';
console.log(typeof ok);
console.log(ok);

// fetchを使って、文字化けを回避しながら中身を読み出す
fetch('index29.js')
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
ok = true;
let ok2 = ok ? 'いいyo' : 'あかん警察';
console.log(ok2);

function vegeColor(vege) {
    switch (vege) {
        case 'potato': {
            const message = 'potato is brown';
            console.log(message);
            break;
        }

        case 'ichigo':
        case 'tomato': {
            const message = `${vege} is red`;
            console.log(message);
            break;
        }

        case 'pampkin': {
            const message = 'pampkin is green';
            console.log(message);
            break;
        }

        default: {
            const message = 'not found';
            console.log(message);
        }
    }
    // if (vege === 'potato') {
    //     console.log('potato is brown!');
    // } else if (vege === 'pampkin') {
    //     console.log('pampkin is green!');
    // } else if (vege === 'tomato') {
    //     console.log('tomato is red!');
    // }
}
vegeColor('pampkin');

let count = 0;
//条件式はtrueを求める。
while (count < 10) {
    console.log(count);

    count += 1;
}

let e = 4 < 10;
console.log(e);

async function callApi() {
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
    });
}
callApi();
