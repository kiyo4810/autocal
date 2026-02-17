const rowDefinitions = [
    ['【収入】', 'category-header', 'section'], // 見出し用の行（入力不可）
    ['初期所持金', '', 'init_cash', '100'], // 以下、入力項目
    ['手残り収入', '', 'income_net', '500'],
    ['その他収入', '', 'income_etc', '0'],
    ['-- 年間収入合計', 'subtotal-income-row', 'total_income'], // 計算結果表示用

    ['【支出】', 'category-header', 'section'],
    ['生活費', '', 'exp_life', '200'],
    ['住宅', '', 'exp_house', '120'],
    ['教育', '', 'exp_edu', '0'],
    ['車', '', 'exp_car', '0'],
    ['その他費用', '', 'exp_etc', '10'],
    ['-- 年間支出合計', 'subtotal-expense-row', 'total_expense'], // 計算結果表示用

    ['累計年残高', 'balance-row', 'grand_balance'], // 最終的な累計結果
];
//forEachの第一引数は配列、第二引数はインデックス番号
rowDefinitions.forEach(([title, cat, engTitle, value], i) => {
    console.log(title);
    const category = cat || 'ないよ';
    console.log(category);
    const englishTitle = engTitle || 'No, lah.';
    console.log(englishTitle);
    const valueNum = value || '数値なし';
    console.log(valueNum);
    console.log('-------');
    let r = `${title},${cat},${engTitle},${value}`;
    let p = document.createElement('p');
    p.innerText = r;
    document.body.appendChild(p);
});
//このif分もクイズで研究しよう
//if (name === 'apple') console.log(color);
