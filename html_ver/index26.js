// 1. メニューデータを数値型 (Number) に変更
const menuData = [
    {
        category: 'FOOD',
        name: 'マレーシア風カレーパン',
        price: 12.0,
        desc: 'GOMA+PANも大好きな、スパイス香る自家製フィリング。',
    },
    {
        category: 'FOOD',
        name: '猫の肉球サンド',
        price: 15.39,
        desc: '愛らしい肉球型のサンドイッチ、チキンマヨネーズ。',
    }, // 小数点の例
    {
        category: 'DRINK',
        name: 'マレーシア産ホワイトコーヒー',
        price: 10.0,
        desc: '濃厚でまろやかな、マレーシア伝統の味わい。',
    },
    {
        category: 'DRINK',
        name: 'フルーツティー（保護猫支援）',
        price: 14.5,
        desc: '季節の果物を使った爽やかなティー。',
    },
];

function displayMenu() {
    const menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';
    const categories = ['FOOD', 'DRINK'];

    categories.forEach((cat) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category';
        categoryDiv.innerHTML = `<h3 class="category-title">${cat}</h3>`;

        const items = menuData.filter((item) => item.category === cat);

        items.forEach((item) => {
            // 【重要】数値型の item.price を小数点2桁の文字列に変換
            // toFixed(2) を使うことで 12 -> 12.00 / 15.39 -> 15.39 になります
            const formattedPrice = item.price.toFixed(2);

            const itemHtml = `
                <div class="menu-item">
                    <div class="item-main">
                        <span class="name">${item.name}</span>
                        <span class="price">$ ${formattedPrice}</span>
                    </div>
                    <p class="description">${item.desc}</p>
                </div>
            `;
            categoryDiv.innerHTML += itemHtml;
        });

        menuGrid.appendChild(categoryDiv);
    });
}

displayMenu();
