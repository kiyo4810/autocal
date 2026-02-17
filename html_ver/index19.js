// 要素を取得
const video = document.getElementById('bgVideo');
const btn = document.getElementById('volumeBtn');

// ボタンクリック時のイベント
btn.addEventListener('click', () => {
    // video.muted は true (消音) か false (音あり)
    if (video.muted) {
        // ミュートを解除
        video.muted = false;
        btn.textContent = '音を消す';
        btn.style.background = 'rgb(100, 70, 100)'; // 押した感が出るよう少し色を濃く（任意）
    } else {
        // ミュートにする
        video.muted = true;
        btn.textContent = '音を出す';
        btn.style.background = 'rgb(142, 96, 142)'; // 元の色に戻す
    }
});
