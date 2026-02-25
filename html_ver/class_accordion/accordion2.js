(() => {
    class Accordion {
        constructor(obj) {
            console.log(obj, obj.hookName);
            const $elm = document.querySelector(obj.hookName);
            const $trigger = $elm.getElementsByTagName(obj.tagName);
            const triggerLen = $trigger.length;
            let index = 0;
            while (index < triggerLen) {
                $trigger[index].addEventListener('click', (e) =>
                    this.clickHandler(e),
                );
                index++;
            }
        }
        clickHandler(e) {
            e.preventDefault(); //おまじない
            const $target = e.currentTarget;
            const $content = $target.nextElementSibling;
            if ($content.style.display === 'block') {
                $content.style.display = 'none';
            } else {
                $content.style.display = 'block';
            }
        }
    }
    const fuckingAccordion = new Accordion({
        hookName: '#js-faq',
        tagName: 'p',
    });

    const rararaAccordion = new Accordion({
        hookName: '#js-accordion',
        tagName: 'a',
    });

    const riririAccordion = new Accordion({
        hookName: '#js-accordion-mini',
        tagName: 'dt',
    });

    // クリックしたらイベント（eでもeveなんでもいい、
    // イベントオブジェクト）が自然発生、湧き上がる。
    // eはデフォルトでもらえるプレゼント。要受取窓口。()ではだめで(e)にする
    // そして関数も発動。その関数はここでは無名関数(e)=>{、、、}の部分
    // その無名関数にeイベントが引き継がれる
    // 詳細解説　https://gemini.google.com/share/e0463e5f15a3

    // clickHandler関数に置き換えず以下に書き換えてもいい
    // $trigger[0].addEventListener('click', (e) => {
    //     e.preventDefault(); //おまじない
    //     const $content = $trigger[0].nextElementSibling;
    //     if ($content.style.display === 'block') {
    //         $content.style.display = 'none';
    //     } else {
    //         $content.style.display = 'block';
    //     }
    // });
})();
