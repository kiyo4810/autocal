import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [currentDisplay, setCurrentDisplay] = useState('0');
    const [shouldResetScreen, setShouldResetScreen] = useState(false);
    const [bgImage, setBgImage] = useState('/autocal/images/akipassport.png');
    const [isPatternMode, setIsPatternMode] = useState(true);

    // 音声ファイルの準備
    const catSound = useRef(new Audio('/autocal/images/cat.mp3'));
    const specialSound = useRef(new Audio('/autocal/images/special.mp3'));

    const playSound = (sound) => {
        sound.current.currentTime = 0;
        sound.current.play().catch(() => {});
    };

    // カンマ区切り表示の作成
    const formattedDisplay = () => {
        const parts = currentDisplay.split(/([\+\-\*\/])/);
        return parts
            .map((part) => {
                if (['+', '-', '*', '/'].includes(part) || part === '')
                    return part;
                if (part === '.') return '.';
                const [int, dec] = part.split('.');
                return dec !== undefined
                    ? `${Number(int).toLocaleString()}.${dec}`
                    : Number(int).toLocaleString();
            })
            .join('');
    };

    const inputNum = (num) => {
        setCurrentDisplay((prev) =>
            prev === '0' || shouldResetScreen ? num : prev + num
        );
        setShouldResetScreen(false);
        playSound(catSound);
    };

    const inputOp = (op) => {
        setShouldResetScreen(false);
        const lastChar = currentDisplay.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            setCurrentDisplay((prev) => prev.slice(0, -1) + op);
        } else {
            setCurrentDisplay((prev) => prev + op);
        }
        playSound(catSound);
    };

    const calculate = () => {
        let expression = currentDisplay;
        if (['+', '-', '*', '/'].includes(expression.slice(-1)))
            expression = expression.slice(0, -1);
        try {
            let result = eval(expression);
            if (!Number.isInteger(result))
                result = Math.round(result * 10000) / 10000;
            setCurrentDisplay(String(result));
            setShouldResetScreen(true);
            playSound(specialSound);
        } catch {
            setCurrentDisplay('0');
        }
    };

    const handleBgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setBgImage(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            className="calculator-body"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: isPatternMode ? 'repeat' : 'no-repeat',
                backgroundSize: isPatternMode ? '150px' : 'cover', // 'contain' から 'cover' に変更
                backgroundPosition: 'center', // 画像を中央に寄せる
                backgroundAttachment: 'fixed', // スクロールしても背景を固定する（お好みで）
            }}
        >
            <div className="container">
                <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
                    💰 React版猫計算機
                </h3>
                <input
                    type="text"
                    id="display"
                    value={formattedDisplay()}
                    readOnly
                />

                <div className="calc-grid">
                    <button
                        className="btn btn-clear"
                        onClick={() => {
                            setCurrentDisplay('0');
                            playSound(catSound);
                        }}
                    >
                        C
                    </button>
                    <button className="btn btn-op" onClick={() => inputOp('/')}>
                        ÷
                    </button>
                    <button className="btn btn-op" onClick={() => inputOp('*')}>
                        ×
                    </button>
                    <button
                        className="btn btn-clear"
                        onClick={() => {
                            setCurrentDisplay((prev) =>
                                prev.length > 1 ? prev.slice(0, -1) : '0'
                            );
                            playSound(catSound);
                        }}
                    >
                        ⌫
                    </button>

                    {['7', '8', '9', '-'].map((b) => (
                        <button
                            key={b}
                            className={`btn ${isNaN(b) ? 'btn-op' : 'btn-num'}`}
                            onClick={() =>
                                isNaN(b) ? inputOp(b) : inputNum(b)
                            }
                        >
                            {b === '*' ? '×' : b === '/' ? '÷' : b}
                        </button>
                    ))}
                    {['4', '5', '6', '+'].map((b) => (
                        <button
                            key={b}
                            className={`btn ${isNaN(b) ? 'btn-op' : 'btn-num'}`}
                            onClick={() =>
                                isNaN(b) ? inputOp(b) : inputNum(b)
                            }
                        >
                            {b}
                        </button>
                    ))}

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gridColumn: 'span 3',
                            gap: '10px',
                        }}
                    >
                        {['1', '2', '3'].map((n) => (
                            <button
                                key={n}
                                className="btn btn-num"
                                onClick={() => inputNum(n)}
                            >
                                {n}
                            </button>
                        ))}
                        <button
                            className="btn btn-num"
                            style={{ gridColumn: 'span 2' }}
                            onClick={() => inputNum('0')}
                        >
                            0
                        </button>
                        <button
                            className="btn btn-num"
                            onClick={() => inputNum('.')}
                        >
                            .
                        </button>
                    </div>
                    <button className="btn btn-equal" onClick={calculate}>
                        =
                    </button>
                </div>

                <div className="settings-area">
                    <label>背景画像を変更</label>
                    <input
                        type="file"
                        className="file-input"
                        accept="image/*"
                        onChange={handleBgChange}
                    />
                    <button
                        className={`pattern-toggle-btn ${
                            isPatternMode ? 'btn-pattern-active' : ''
                        }`}
                        onClick={() => setIsPatternMode(!isPatternMode)}
                    >
                        繰り返し表示 {isPatternMode ? 'OFF' : 'ON'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
