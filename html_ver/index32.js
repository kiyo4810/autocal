//========================================================
//機能編   4-1-6 手書き風ロゴアニメーション
//========================================================

//SVGアニメーションの描画
var stroke;
stroke = new Vivus(
    'mask',
    {
        start: 'manual', //自動再生をせずスタートをマニュアルに
        type: 'scenario-sync', // アニメーションのタイプを設定
        duration: 10, // 描画速度（約1秒程度に調整）
        forceRender: false,
        animTimingFunction: Vivus.EASE,
    },
    function (obj) {
        // アニメーションが完了した時の処理
        // ロゴとスプラッシュエリアをフェードアウトさせる
        $('#splash_logo').fadeOut('slow');
        $('#splash').fadeOut('slow', function () {
            // フェードアウト完了後にメインコンテンツを表示するクラスを付与
            $('body').addClass('appear');
            // メイン画面内のアニメーション（スクロール等）を開始
            ScrollAnime();
        });
    },
);

//========================================================
//機能編   5-1-20クリックしたら円形背景が拡大（右上から）
//========================================================

$('.openbtn').click(function () {
    $(this).toggleClass('active');
    $('#g-nav').toggleClass('panelactive');
    $('.circle-bg').toggleClass('circleactive');
});

$('#g-nav a').click(function () {
    $('.openbtn').removeClass('active');
    $('#g-nav').removeClass('panelactive');
    $('.circle-bg').removeClass('circleactive');
});

//========================================================
// 印象編 8-5 テキストが流れるように出現（下から上）
//========================================================

function ScrollAnime() {
    $('.downAnime').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('slideAnimeDownUp');
            $(this).children('.downAnimeInner').addClass('slideAnimeUpDown');
        } else {
            $(this).removeClass('slideAnimeDownUp');
            $(this).children('.downAnimeInner').removeClass('slideAnimeUpDown');
        }
    });
}

$(window).scroll(function () {
    ScrollAnime();
});

//========================================================
// 関数をまとめる
//========================================================

$(window).on('load', function () {
    // ページ読み込み完了後にSVGアニメーションを開始
    stroke.play();
});
