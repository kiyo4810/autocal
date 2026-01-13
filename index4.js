'use strict';
{
    // オブジェクトを生成
    const person = {
        name: ['かとう', 'しむら'],
        age: 70,
        gender: 'male',
        interests: ['おんがく', 'さんすう'],
        bio: function () {
            alert(
                `${this.name[0]}、${this.name[1]} は ${this.age} 歳です。 趣味は ${this.interests[0]} と ${this.interests[1]}です。`
            );
            return '自己紹介おわり';
        },
        getNextAge: function () {
            return this.age + 1;
        },
        checkAdult: function () {
            if (this.age > 65) {
                document.getElementById('adultcheck').innerText =
                    '受給資格あり！';
                return '受給OK';
            } else {
                document.getElementById('adultcheck').innerText =
                    '受給資格なし！';
                return '受給NG';
            }
        },
    };
    console.log(person.bio());
    console.log(person.getNextAge());
    // これを追加！
    console.log(person.checkAdult());

    // person.bio();

    // これは配列✖️
    // const person = [

    // ];

    class Position {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    let Pos = new Position(3, 5);
    console.log(Pos);
}
