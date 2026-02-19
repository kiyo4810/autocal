// --- 定数の定義 ---
const START_AGE = 0; // シミュレーションを開始する年齢
const END_AGE = 10; // シミュレーションを終了する年齢
const COLUMN_COUNT = END_AGE - START_AGE + 1; // 合計の列数（0から100までなので101列）

function initializeTable() {
    const headerRow = document.getElementById('header-row');
    const tableBody = document.getElementById('table-body');
    for (let index = 0; index < COLUMN_COUNT - 1; index++) {
        const th = document.createElement('th');
        th.innerText = `thの${index}歳`;
        headerRow.appendChild(th);
    }

    for (let i = 0; i < 10; i++) {
        const bodyTr = document.createElement('tr');

        for (let j = 0; j < COLUMN_COUNT; j++) {
            if (j === 0) {
                const tdH = document.createElement('td');
                tdH.innerText = 'td項目';
                bodyTr.appendChild(tdH);
            } else {
                const td = document.createElement('td');
                td.innerText = `tdの${j - 1}列`;
                bodyTr.appendChild(td);
            }
        }
        tableBody.appendChild(bodyTr);
    }
}
initializeTable();
