class Test {
    constructor(value) {
        console.log(value);
        // クラスでは　let num =10;　の代わりに
        // this.num = 10;
        // let author = "ちゃんやま";の代わりに
        this.author = 'ちゃんやま'; // this はほぼTestのこと
    }
}

let test = new Test(10);
console.log(test.author);
