function calculate() {
  let prevBalance = 0;
  const numMonths = 6;

  for (let col = 0; col < numMonths; col++) {
    // 各項目の値を取得（空欄なら0）
    const rent =
      parseFloat(
        document.querySelector(`[data-row="rent"][data-col="${col}"]`).value,
      ) || 0;
    const loan =
      parseFloat(
        document.querySelector(`[data-row="loan"][data-col="${col}"]`).value,
      ) || 0;
    const mng =
      parseFloat(
        document.querySelector(`[data-row="mng"][data-col="${col}"]`).value,
      ) || 0;
    const etc =
      parseFloat(
        document.querySelector(`[data-row="etc"][data-col="${col}"]`).value,
      ) || 0;

    // 初月のみ初期所持金を加算
    let initial = 0;
    if (col === 0) {
      initial =
        parseFloat(
          document.querySelector(`[data-row="initial"][data-col="0"]`).value,
        ) || 0;
    }

    // 月間収支の計算 (収入 - 支出)
    const monthlyTotal = rent - (loan + mng + etc);

    // 表示の更新
    const monthlyEl = document.getElementById(`monthly-${col}`);
    monthlyEl.innerText = monthlyTotal.toLocaleString();

    // マイナスなら赤色にする
    monthlyEl.className = monthlyTotal >= 0 ? "plus" : "minus";

    // 累計残高の計算 (前月残高 + 今月収支 + 初月なら初期費用)
    const currentBalance = prevBalance + monthlyTotal + initial;
    const balanceEl = document.getElementById(`balance-${col}`);
    balanceEl.innerText = currentBalance.toLocaleString() + " 円";

    // 次の月の計算用に残高を保持
    prevBalance = currentBalance;
  }
}

// 全てのinput要素にイベントリスナーを設定
document.querySelectorAll(".val").forEach((input) => {
  input.addEventListener("input", calculate);
});
console.log("index2.jsに分離成功");
console.log("index2.jsに分離成功２");
console.log("index2.jsに分離成功３");
console.log("index2.jsに分離成功４");
console.log("index2.jsに分離成功５");
console.log("index2.jsに分離成功６");
console.log("index2.jsに分離成功７");
console.log("index2.jsに分離成功８");

// 初期計算の実行
calculate();
