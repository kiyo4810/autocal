// コードを画面表示fetchを使って、文字化けを回避しながら中身を読み出す
fetch('index31.js')
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
// sayNameパラメーター引数にマルタという引数をデフォルト設定する
// const sayHi = (sayName = 'ご利用者', sex = '男性', brain = 'かしこい') =>
//     `ほほほい ${sayName}さん。あなたは、${sex}で、${brain}ですよ`;
// console.log(sayHi(undefined,'おかま'));

const sayHi = (sex = '男性', brain = 'かしこい', sayName = 'ご利用者') =>
    `ほほほい ${sayName}さん。あなたは、${sex}で、${brain}ですよ`;
console.log(sayHi('female', 'smart'));

// const nums =[3,2,3,4,5,6,7];

let sum = (a, b, ...nums) => {
    // ...の本来の意味はrestパラメーター。残りを配列にする。
    console.log(a);
    console.log(b);
    console.log(nums);

    let total = 0 + a + b;
    for (const num of nums) {
        total += num;
    }
    return total;
};
console.log(sum(3, 2, 3, 4, 5, 6, 7));

// function waitAndDo(callback){
//     console.log("１．コーヒーを淹れます");
//     setTimeout(() => {
//         console.log("２．コーヒーができました");
//         callback();
//     }, 3000);

// }

// waitAndDo(()=> console.log("どうぞお召し上がれ"))

// function upAndDisplay(cb){
// console.log("1. アップロードします！");
// setTimeout(() => {
//     console.log("2. アップロード完了");
//     cb();
// }, 2000);

// }

// upAndDisplay(()=> console.log("3. どうぞご覧あれ"));

// メイン関数：金額を受け取ってポイント（10%）を計算する
// function calculatePoints(amount, callback) {
//     console.log(`1. 🛒 金額 ${amount}円 の計算を開始します...`);

//     setTimeout(() => {
//         const points = amount * 0.1; // 10%ポイント還元
//         console.log("2. 計算が完了しました。");

//         // ここで、計算したポイント（points）を引数に入れて、
//         // 預かった「指示書（callback）」を実行してください

//         callback(points);

//     }, 1500);
// }

// // 実行パターンA：シンプルにコンソールに出す
// calculatePoints(5000, (result) => {
//     console.log(`3. 【結果】今回の還元ポイントは ${result}pt です！`);
// });

// メイン関数：金額を受け取ってポイント（10%）を計算する
// function calP (yen,cb){
//     console.log(`${yen}おあずかり！`);
//     setTimeout(() => {
//     const point = yen *0.1;
//     console.log(`今回 ${point} P計上`);
//     // ここで、計算したポイント（points）を引数に入れて、
//         // 預かった「指示書（callback）」を実行してください
//     cb(point,yen);
//     }, 2000);
// }
// calP(5000,(point,yen)=> console.log(`${yen}円お買い上げあざます！おめでとう！${point} point get!`));

//////////////
// function getAndClean (soapMoney, cb){
//     console.log(`石鹸代金${soapMoney}円お預かり`);
//     const doubleCampaign = soapMoney*2;
//     setTimeout(() => {
//         console.log(`かんりょーー！2倍の${doubleCampaign}円分きれいにしたよ`);
//         cb(doubleCampaign);
//     }, 2000);
// }
// getAndClean(500,(doubled)=>console.log(`${doubled}円分きれいにしたからね。またきてね`))

function bbb(ryobi, dRate, cb) {
    console.log(`1. ${ryobi}円かと思いきや、、、`);
    const ryobiDiscount = ryobi * (dRate / 100);
    console.log(`2. ${ryobiDiscount}円割り引くよ`);
    setTimeout(() => {
        if (ryobiDiscount > 1000) {
            console.log(
                `3. まじ！”！${ryobi}から${ryobiDiscount}円割引の${ryobi - ryobiDiscount}円ね`,
            );
        } else {
            console.log(
                `3. まいど”！${ryobi}から${ryobiDiscount}円割引の${ryobi - ryobiDiscount}円ね`,
            );
        }
        cb(ryobi, ryobiDiscount);
    }, 2000);
}
bbb(10000, 10, (r, rd) =>
    console.log(`4. ${r}円のもの、${rd}も安く買えたよ。ばいびー！`),
);

const nums = [10, 20, 30];
function showTotal(x, y, z) {
    console.log(x + y + z);
}
// 配列の中身をバラバラにして、関数の引数にピッタリはめ込む！
showTotal(...nums); // showTotal(10, 20, 30) と同じ意味になる

globalThis.apple = 'apple';
console.log(globalThis);

let generatePerson = () => {
    let age = 0;
    return {
        name: '山田',
        getAge: () => age,
        incrementAge: () => {
            age++;
            return age;
        },
    };
};
const yamada = generatePerson();
// yamada.age =52;
console.log(yamada.incrementAge());
console.log(yamada.incrementAge());
console.log(yamada.incrementAge());
console.log(yamada.incrementAge());
console.log(yamada.incrementAge());
console.log(yamada.getAge());
console.log(yamada.incrementAge());

//再帰関数 Factorial 基本形
// let factorial =(n) =>{
//     if (n===0) return 1;
//     return n * factorial(n-1);
// }

// console.log(factorial(5));

//再帰関数 Factorial 三項演算子型
let factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));
console.log(factorial(6));
