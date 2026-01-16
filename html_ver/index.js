// ナビゲーション
window.addEventListener('DOMContentLoaded', () => {
    const currentFile =
        window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
        if (link.getAttribute('href') === currentFile)
            link.classList.add('active');
    });
});

// 音声
const catSound = new Audio('images/cat.mp3');
const specialSound = new Audio('images/special.mp3');

function playCat() {
    catSound.currentTime = 0;
    catSound.play().catch((e) => {});
}
function playSpecial() {
    specialSound.currentTime = 0;
    specialSound.play().catch((e) => {});
}

// 計算機ロジック
let currentDisplay = '0';
let shouldResetScreen = false;
const displayEl = document.getElementById('display');

// 【重要】カンマ区切りに変換して表示する関数
function updateDisplay() {
    // 数字の部分と記号の部分を分けて、数字だけカンマをつける
    const parts = currentDisplay.split(/([\+\-\*\/])/);
    const formatted = parts
        .map((part) => {
            if (['+', '-', '*', '/'].includes(part) || part === '') return part;
            if (part === '.') return '.';

            // 小数点がある場合を考慮
            const numParts = part.split('.');
            numParts[0] = Number(numParts[0]).toLocaleString();
            return numParts.join('.');
        })
        .join('');

    displayEl.value = formatted;
}

function inputNum(num) {
    if (currentDisplay === '0' || shouldResetScreen) {
        currentDisplay = num;
        shouldResetScreen = false;
    } else {
        currentDisplay += num;
    }
    updateDisplay();
    playCat();
}

function inputOp(op) {
    shouldResetScreen = false;
    const lastChar = currentDisplay.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentDisplay = currentDisplay.slice(0, -1) + op;
    } else {
        currentDisplay += op;
    }
    updateDisplay();
    playCat();
}

function clearDisplay() {
    currentDisplay = '0';
    shouldResetScreen = false;
    updateDisplay();
    playCat();
}

function deleteLast() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateDisplay();
    playCat();
}

function calculateResult() {
    let expression = currentDisplay;
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        expression = expression.slice(0, -1);
    }

    try {
        let result = eval(expression);

        // 精度調整
        if (!Number.isInteger(result)) {
            result = Math.round(result * 10000) / 10000;
        }

        currentDisplay = String(result);
        shouldResetScreen = true;
        updateDisplay();
        playSpecial();
    } catch (e) {
        currentDisplay = '0';
        updateDisplay();
    }
}

// 背景変更
let isPatternMode = true;
function changeBackground() {
    const file = document.getElementById('bgInput').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
            applyStyle();
        };
        reader.readAsDataURL(file);
    }
}
function togglePattern() {
    isPatternMode = !isPatternMode;
    applyStyle();
}
function applyStyle() {
    const btn = document.getElementById('patternBtn');
    if (isPatternMode) {
        document.body.style.backgroundRepeat = 'repeat';
        document.body.style.backgroundSize = '150px';
        btn.innerText = '繰り返し表示 OFF';
        btn.classList.add('btn-pattern-active');
    } else {
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'contain';
        btn.innerText = '繰り返し表示 ON';
        btn.classList.remove('btn-pattern-active');
    }
}
