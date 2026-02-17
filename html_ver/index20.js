// 要素を取得
const video = document.getElementById('bgVideo');
const btn = document.getElementById('volumeBtn');
const audio = document.getElementById('bgAudio');
console.log(btn);

btn.addEventListener('click', (e) => {
    console.log(e);

    // audio.paused が true なら停止中
    if (audio.paused) {
        // 音声を再生
        audio.play();

        // 映像と音のズレが気になる場合は、ここで映像の時間を合わせる
        audio.currentTime = video.currentTime;

        btn.textContent = '🔊Sound off';
        btn.style.background = 'rgb(100, 70, 100)';
    } else {
        // 音声を一時停止
        audio.pause();

        btn.textContent = '🔊Sound on';
        btn.style.background = 'rgb(142, 96, 142)';
    }
});
