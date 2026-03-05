// --- 今日の学習を活かしたメニュー実装 ---

// 1. メニューデータを「オブジェクトの配列」で管理する
const menuData = [
    {
        category: 'FOOD',
        name: 'マレーシア風カレーパン',
        price: '$ 12.00',
        desc: 'GOMAとPANも大好きな、スパイス香る自家製フィリングです。',
    },
    {
        category: 'FOOD',
        name: '猫の肉球サンド',
        price: '$ 16.00',
        desc: '愛らしい肉球型のサンドイッチ、チキンマヨネーズ。',
    },
    {
        category: 'DRINK',
        name: 'マレーシア産ホワイトコーヒー',
        price: '$ 10.00',
        desc: '濃厚でまろやかな、マレーシア伝統の味わい。',
    },
    {
        category: 'DRINK',
        name: 'フルーツティー（保護猫支援）',
        price: '$ 14.00',
        desc: '季節の果物を使った爽やかなティー。',
    },
];

// 2. メニューを表示させる関数
function displayMenu() {
    // HTML内の「menu-grid」という場所を探す
    const menuGrid = document.querySelector('.menu-grid');

    // 一旦中身を空にする
    menuGrid.innerHTML = '';

    // カテゴリごとに分けて表示するための準備
    const categories = ['FOOD', 'DRINK'];

    categories.forEach((cat) => {
        // 各カテゴリの箱（div）を作る
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category';

        // カテゴリの見出し（H3）を作る
        categoryDiv.innerHTML = `<h3 class="category-title">${cat}</h3>`;

        // このカテゴリに属するメニューだけを抜き出して追加していく
        const items = menuData.filter((item) => item.category === cat);

        items.forEach((item) => {
            const itemHtml = `
                <div class="menu-item">
                    <div class="item-main">
                        <span class="name">${item.name}</span>
                        <span class="price">${item.price}</span>
                    </div>
                    <p class="description">${item.desc}</p>
                </div>
            `;
            categoryDiv.innerHTML += itemHtml;
        });

        // 最後にmenu-gridに追加する
        menuGrid.appendChild(categoryDiv);
    });
}

// 3. 関数を実行して画面に表示させる
displayMenu();
