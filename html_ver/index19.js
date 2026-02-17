const video = document.getElementById('bgVideo');
const audio = document.getElementById('bgAudio');
const btn = document.getElementById('volumeBtn');

// 0: ミュート, 1: ハッピー音声(audio), 2: ビデオ音声(video)
let state = 0;

btn.addEventListener('click', () => {
    state = (state + 1) % 3; // 0, 1, 2 を繰り返す

    if (state === 1) {
        // --- ステップ1: ハッピーハッピーハッピー再生 ---
        video.muted = true; // ビデオは消音
        audio.play(); // オーディオ再生

        btn.textContent = '🎵 ハッピー再生中';
        btn.style.background = '#ff69b4'; // ピンク色（ハッピーな感じ）
    } else if (state === 2) {
        // --- ステップ2: Videoのオーディオ再生 ---
        audio.pause(); // オーディオ停止
        audio.currentTime = 0; // 最初に戻しておく
        video.muted = false;
        btn.textContent = '🔊 わんこの声';
        btn.style.background = '#8e608e'; // 元の色系
    } else {
        // --- ステップ0: 初期設定（ミュート）に戻る ---
        video.muted = true; // ビデオ消音
        audio.pause(); // オーディオ停止

        btn.textContent = '🔇 ミュート';
        btn.style.background = '#555'; // グレー
    }
});
