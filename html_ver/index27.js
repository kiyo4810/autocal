// DB登録画面↓
// https://console.firebase.google.com/project/goma-pan-menu/firestore/databases/-default-/data/~2Fmenus~2FLGlWjXNukeA8kXQ32J4q
// 1. メニューデータを数値型 (Number) に変更
// 1. Firebaseライブラリのインポート
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
    getFirestore,
    collection,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// 2. あなたの専用設定（ここをスクショの内容に書き換えてください）
const firebaseConfig = {
    apiKey: 'AIzaSyB4m6JxIIBYq2DWtOyVRVw1smCgpAyLGnk',
    authDomain: 'goma-pan-menu.firebaseapp.com',
    projectId: 'goma-pan-menu',
    storageBucket: 'goma-pan-menu.firebasestorage.app',
    messagingSenderId: '437147967378',
    appId: '1:437147967378:web:8a0739fbfc1e16e5886b4b',
};

// 3. 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Firebaseからデータを取ってきて画面に表示する関数
async function fetchMenu() {
    try {
        const querySnapshot = await getDocs(collection(db, 'menus'));
        const menuData = [];
        querySnapshot.forEach((doc) => {
            menuData.push(doc.data());
        });
        renderMenu(menuData);
    } catch (e) {
        console.error('Error fetching documents: ', e);
    }
}

// 5. 画面にHTMLを組み立てる関数
function renderMenu(data) {
    const menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;
    menuGrid.innerHTML = '';

    const categories = ['FOOD', 'DRINK'];
    categories.forEach((cat) => {
        const catItems = data.filter((item) => item.category === cat);
        if (catItems.length === 0) return;

        const div = document.createElement('div');
        div.className = 'menu-category';
        div.innerHTML = `<h3 class="category-title">${cat}</h3>`;

        catItems.forEach((item) => {
            // 数値型の価格を小数点2桁にする
            const price = Number(item.price).toFixed(2);
            div.innerHTML += `
              <div class="menu-item">
                <div class="item-main">
                  <span class="name">${item.name}</span>
                  <span class="price">$ ${price}</span>
                </div>
                <p class="description">${item.desc}</p>
              </div>`;
        });
        menuGrid.appendChild(div);
    });
}

// 実行！
fetchMenu();
