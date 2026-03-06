const chanyamaIQ = 70;
const chanyamaAtitude = 'bad'; // bad, normal, goodがある
const chanyamaMoney = 70000001;
const chanyamaHeight = 195;

const PASSING_IQ = 90;
const PASSING_ATTITUDE = ['normal', 'good'];
const PASSING_MONEY = 500000;
const MIN_HEIGHT = 140;
const MAX_HEIGHT = 180;
const RICH_FAMILY_MONEY = 70000000;

const isIQEnough = chanyamaIQ > PASSING_IQ;
const isAttitudeEnough = PASSING_ATTITUDE.includes(chanyamaAtitude);
const isMoneyEnough = chanyamaMoney > PASSING_MONEY;
const isHighOK = chanyamaHeight > MIN_HEIGHT && chanyamaHeight < MAX_HEIGHT;
const isRich = chanyamaMoney > RICH_FAMILY_MONEY;

const h2 = document.querySelector('h2');
if (
    //(賢く、態度も普通以上で、お金も50万円以上あり、普通の身長の範囲)もしくは(お金持ちであるか)
    (isIQEnough && isAttitudeEnough && isMoneyEnough && isHighOK) ||
    isRich
) {
    console.log('🏫おめでとう、合格です！');
    h2.innerText = '🏫おめでとう、合格です！';
} else {
    console.log('😭残念、不合格です、、、');
    h2.innerText = '😭残念、不合格です、、、';
}

// fetchを使って、文字化けを回避しながら中身を読み出す
fetch('index28.js')
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
