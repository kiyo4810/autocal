'use strict';

// ===================================================
//  STATE
// ===================================================
let settings = {
    currentAge:       30,
    initialAssets:   500,
    inflationRate:     2.0,   // %
    investmentReturn:  4.0,   // %
    debtRate:          1.5,   // % (残高マイナス時の借入金利)
    salary:           500,    // 万円 (現在の手取り年収)
    salaryGrowth:      2.0,   // %
    workStartAge:     22,
    retirementAge:    65,
    pension:          150,    // 万円/年
    pensionStartAge:  65,
    livingCost:       200,    // 万円/年
    housingCost:      120,    // 万円/年
};

let lifeEvents  = [];
let nextEventId = 1;
let chartInst   = null;

// ===================================================
//  PRESETS（モーダルの初期値）
// ===================================================
const PRESETS = {
    birth:     { name: '出産費用',         type: 'expense', amount:   50, duration:  1, inflationAdjusted: false },
    education: { name: '子どもの教育費',   type: 'expense', amount:  100, duration: 22, inflationAdjusted: true  },
    house:     { name: 'マイホーム購入',   type: 'expense', amount: 3000, duration:  1, inflationAdjusted: false },
    car:       { name: '車購入',           type: 'expense', amount:  300, duration:  1, inflationAdjusted: false },
    custom:    { name: '',                 type: 'expense', amount:  100, duration:  1, inflationAdjusted: false },
};

// ===================================================
//  SIMULATION ENGINE
// ===================================================
function simulate() {
    const results    = [];
    let   balance    = settings.initialAssets;
    const inflRate   = settings.inflationRate    / 100;
    const invRate    = settings.investmentReturn / 100;
    const debtRate   = settings.debtRate         / 100;
    const salGrowth  = settings.salaryGrowth     / 100;

    for (let age = settings.currentAge; age <= 100; age++) {
        const elapsed    = age - settings.currentAge;
        const inflFactor = Math.pow(1 + inflRate, elapsed);

        // --- 収入 ---
        let salary = 0;
        if (age >= settings.workStartAge && age < settings.retirementAge) {
            salary = settings.salary * Math.pow(1 + salGrowth, elapsed);
        }
        let pension = 0;
        if (age >= settings.pensionStartAge) {
            pension = settings.pension;
        }
        const laborIncome = salary + pension;

        // --- 運用益 / 負債利息 ---
        const investReturn = balance >= 0
            ? balance * invRate
            : balance * debtRate;   // 負の数 → 利息が増える

        // --- 基本支出（インフレ連動）---
        const livingExp  = settings.livingCost  * inflFactor;
        const housingExp = settings.housingCost * inflFactor;

        // --- ライフイベント ---
        let eventExpTotal = 0;
        let eventIncTotal = 0;
        const activeEvents = [];

        for (const ev of lifeEvents) {
            if (age >= ev.startAge && age < ev.startAge + ev.duration) {
                const amt = ev.inflationAdjusted ? ev.amount * inflFactor : ev.amount;
                if (ev.type === 'expense') {
                    eventExpTotal += amt;
                    activeEvents.push({ name: ev.name, amount: -amt, type: 'expense' });
                } else {
                    eventIncTotal += amt;
                    activeEvents.push({ name: ev.name, amount: amt, type: 'income' });
                }
            }
        }

        // --- 集計 ---
        const totalIncome  = laborIncome + investReturn + eventIncTotal;
        const totalExpense = livingExp   + housingExp   + eventExpTotal;
        const net          = totalIncome - totalExpense;
        balance            = balance + net;

        results.push({
            age,
            salary:       Math.round(salary),
            pension:      Math.round(pension),
            laborIncome:  Math.round(laborIncome),
            investReturn: Math.round(investReturn),
            eventInc:     Math.round(eventIncTotal),
            totalIncome:  Math.round(totalIncome),
            living:       Math.round(livingExp),
            housing:      Math.round(housingExp),
            eventExp:     Math.round(eventExpTotal),
            totalExpense: Math.round(totalExpense),
            net:          Math.round(net),
            balance:      Math.round(balance),
            activeEvents,
        });
    }
    return results;
}

// ===================================================
//  RENDER ORCHESTRATOR
// ===================================================
function renderAll() {
    const results = simulate();
    renderSummary(results);
    renderChart(results);
    renderTable(results);
    saveToStorage();
}

// ===================================================
//  SUMMARY CARDS
// ===================================================
function renderSummary(results) {
    const totalInc  = results.reduce((s, r) => s + r.totalIncome,  0);
    const totalExp  = results.reduce((s, r) => s + r.totalExpense, 0);
    const finalBal  = results.at(-1)?.balance ?? 0;
    const bankruptR = results.find(r => r.balance < 0);

    document.getElementById('sum-income').textContent  = formatWan(Math.round(totalInc));
    document.getElementById('sum-expense').textContent = formatWan(Math.round(totalExp));

    const balEl   = document.getElementById('sum-balance');
    balEl.textContent = formatWan(Math.round(finalBal));
    balEl.className   = 'card-value ' + (finalBal >= 0 ? 'green' : 'red');

    const bkEl   = document.getElementById('sum-bankrupt');
    const bkUnit = document.getElementById('sum-bankrupt-unit');
    const bkCard = document.getElementById('card-bankrupt');
    if (bankruptR) {
        bkEl.textContent   = `${bankruptR.age}歳`;
        bkEl.className     = 'card-value orange';
        bkUnit.textContent = '要注意！';
        bkCard.style.borderLeft = '4px solid var(--orange)';
    } else {
        bkEl.textContent   = 'なし';
        bkEl.className     = 'card-value green';
        bkUnit.textContent = '安全圏 ✓';
        bkCard.style.borderLeft = '4px solid var(--green)';
    }
}

// ===================================================
//  CHART（Chart.js 4）
// ===================================================
function renderChart(results) {
    const labels      = results.map(r => String(r.age));
    const incomeData  = results.map(r => r.laborIncome + r.eventInc);
    const expenseData = results.map(r => r.totalExpense);
    const investData  = results.map(r => Math.max(r.investReturn, 0));
    const balanceData = results.map(r => r.balance);

    if (chartInst) { chartInst.destroy(); chartInst = null; }

    const ctx = document.getElementById('mainChart').getContext('2d');
    chartInst = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: '給与・年金収入',
                    data: incomeData,
                    backgroundColor: 'rgba(40,167,69,0.60)',
                    borderRadius: 1,
                    yAxisID: 'y',
                    order: 3,
                },
                {
                    label: '投資収益',
                    data: investData,
                    backgroundColor: 'rgba(52,152,219,0.55)',
                    borderRadius: 1,
                    yAxisID: 'y',
                    order: 3,
                },
                {
                    label: '年間支出',
                    data: expenseData,
                    backgroundColor: 'rgba(220,53,69,0.55)',
                    borderRadius: 1,
                    yAxisID: 'y',
                    order: 3,
                },
                {
                    type: 'line',
                    label: '累計残高',
                    data: balanceData,
                    borderColor: 'rgba(41,128,185,0.95)',
                    backgroundColor: 'rgba(41,128,185,0.08)',
                    borderWidth: 2.5,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    tension: 0.35,
                    yAxisID: 'y2',
                    order: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { font: { size: 12 }, padding: 16 },
                },
                tooltip: {
                    callbacks: {
                        title: (items) => `${items[0].label}歳`,
                        label: (item)  => ` ${item.dataset.label}: ${item.raw.toLocaleString()} 万円`,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 0,
                        callback: (val, idx) => {
                            const age = results[idx]?.age;
                            return (age % 10 === 0) ? `${age}歳` : '';
                        },
                        font: { size: 11 },
                    },
                    grid: { display: false },
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: '年間収支（万円）', font: { size: 11 } },
                    ticks: { font: { size: 11 } },
                },
                y2: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: '累計残高（万円）', font: { size: 11 } },
                    grid: { drawOnChartArea: false },
                    ticks: { font: { size: 11 } },
                },
            },
        },
    });
}

// ===================================================
//  TABLE
// ===================================================
function renderTable(results) {
    const tbody = document.getElementById('simTableBody');
    tbody.innerHTML = '';

    for (const r of results) {
        const tr  = document.createElement('tr');
        const neg = r.balance < 0;
        const cur = r.age === settings.currentAge;

        if (cur) tr.className = 'row-current';
        else if (neg) tr.className = 'row-negative';

        // イベントのツールチップ
        const hasEvents = r.activeEvents.length > 0;
        if (hasEvents) {
            tr.title = r.activeEvents
                .map(e => `${e.name}: ${Math.abs(Math.round(e.amount)).toLocaleString()}万円`)
                .join('\n');
        }

        // イベント支出・収入の表示
        let eventCell = '—';
        if (r.eventExp > 0 && r.eventInc > 0) {
            eventCell = `<span class="c-event-expense">-${r.eventExp.toLocaleString()}</span> / <span class="c-event-income">+${r.eventInc.toLocaleString()}</span>`;
        } else if (r.eventExp > 0) {
            eventCell = `<span class="c-event-expense">-${r.eventExp.toLocaleString()} ${hasEvents ? '⓪' : ''}</span>`;
        } else if (r.eventInc > 0) {
            eventCell = `<span class="c-event-income">+${r.eventInc.toLocaleString()}</span>`;
        }

        const f = (n) => n !== 0 ? formatWan(n) : '—';
        const fSign = (n) => n >= 0 ? `+${formatWan(n)}` : formatWan(n);

        tr.innerHTML = `
            <td class="col-age">${r.age}歳</td>
            <td class="${r.laborIncome > 0 ? 'c-income' : 'c-muted'}">${f(r.laborIncome)}</td>
            <td class="${r.investReturn >= 0 ? 'c-invest' : 'c-expense'}">${f(r.investReturn)}</td>
            <td class="c-income">${formatWan(r.totalIncome)}</td>
            <td class="c-expense">${formatWan(r.living)}</td>
            <td class="c-expense">${formatWan(r.housing)}</td>
            <td>${eventCell}</td>
            <td class="c-expense">${formatWan(r.totalExpense)}</td>
            <td class="${r.net >= 0 ? 'c-net-pos' : 'c-net-neg'}">${fSign(r.net)}</td>
            <td class="${r.balance >= 0 ? 'c-bal-pos' : 'c-bal-neg'}">${formatWan(r.balance)}</td>
        `;
        tbody.appendChild(tr);
    }
}

// ===================================================
//  EVENTS LIST
// ===================================================
function renderEventList() {
    const container = document.getElementById('events-list');
    const sorted    = [...lifeEvents].sort((a, b) => a.startAge - b.startAge);

    if (sorted.length === 0) {
        container.innerHTML = '<div class="event-empty">イベントがまだありません。上のプリセットボタンから追加してください。</div>';
        return;
    }

    container.innerHTML = sorted.map(ev => {
        const endAge   = ev.startAge + ev.duration - 1;
        const ageLabel = ev.duration === 1 ? `${ev.startAge}歳` : `${ev.startAge}〜${endAge}歳`;
        const sign     = ev.type === 'expense' ? '-' : '+';
        const amtLabel = `${sign}${ev.amount.toLocaleString()}万円/年`;
        const inflTag  = ev.inflationAdjusted ? '<span class="event-infl">📈 インフレ連動</span>' : '';
        const typeClass= ev.type === 'income' ? 'income-event' : '';

        return `
<div class="event-item ${typeClass}">
    <span class="event-age">${ageLabel}</span>
    <span class="event-name">${esc(ev.name)}</span>
    <span class="event-amount">${amtLabel}${inflTag}</span>
    <div class="event-actions">
        <button class="btn-edit"   onclick="openModal(null,${ev.id})">編集</button>
        <button class="btn-delete" onclick="deleteEvent(${ev.id})">削除</button>
    </div>
</div>`;
    }).join('');
}

const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ===================================================
//  数字フォーマッター（万円 → 億万円表記）
// ===================================================
function formatWan(num) {
    if (typeof num !== 'number') num = parseFloat(num) || 0;
    if (num === 0) return '0万円';

    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    if (abs >= 10000) {
        const oku = Math.floor(abs / 10000);
        const man = abs % 10000;
        if (man === 0) {
            return `${sign}${oku.toLocaleString()}億円`;
        } else {
            return `${sign}${oku.toLocaleString()}億${man.toLocaleString()}万円`;
        }
    } else {
        return `${sign}${abs.toLocaleString()}万円`;
    }
}

// ===================================================
//  MODAL
// ===================================================
function openModal(presetKey, editId = null) {
    document.getElementById('m-id').value = editId ?? '';

    if (editId !== null) {
        const ev = lifeEvents.find(e => e.id === editId);
        if (!ev) return;
        document.getElementById('modal-title').textContent = 'イベントを編集';
        document.getElementById('m-name').value       = ev.name;
        document.getElementById('m-type').value       = ev.type;
        document.getElementById('m-startAge').value   = ev.startAge;
        document.getElementById('m-amount').value     = ev.amount;
        document.getElementById('m-duration').value   = ev.duration;
        document.getElementById('m-inflation').checked= ev.inflationAdjusted;
    } else {
        const p = PRESETS[presetKey] ?? PRESETS.custom;
        document.getElementById('modal-title').textContent = 'イベントを追加';
        document.getElementById('m-name').value       = p.name;
        document.getElementById('m-type').value       = p.type;
        document.getElementById('m-startAge').value   = settings.currentAge + 5;
        document.getElementById('m-amount').value     = p.amount;
        document.getElementById('m-duration').value   = p.duration;
        document.getElementById('m-inflation').checked= p.inflationAdjusted;
    }

    document.getElementById('modal-overlay').classList.remove('hidden');
    document.getElementById('m-name').focus();
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function saveEvent() {
    const name = document.getElementById('m-name').value.trim();
    if (!name) { alert('イベント名を入力してください。'); return; }

    const editIdRaw = document.getElementById('m-id').value;
    const editId    = editIdRaw ? parseInt(editIdRaw) : null;

    const ev = {
        id:               editId ?? nextEventId++,
        name,
        type:             document.getElementById('m-type').value,
        startAge:         parseInt(document.getElementById('m-startAge').value)  || 30,
        amount:           parseFloat(document.getElementById('m-amount').value)  ||  0,
        duration:         parseInt(document.getElementById('m-duration').value)  ||  1,
        inflationAdjusted:document.getElementById('m-inflation').checked,
    };

    if (editId !== null) {
        const idx = lifeEvents.findIndex(e => e.id === editId);
        if (idx >= 0) lifeEvents[idx] = ev;
    } else {
        lifeEvents.push(ev);
    }

    closeModal();
    renderEventList();
    renderAll();
}

function deleteEvent(id) {
    if (!confirm('このイベントを削除しますか？')) return;
    lifeEvents = lifeEvents.filter(e => e.id !== id);
    renderEventList();
    renderAll();
}

// ===================================================
//  PANEL TOGGLE
// ===================================================
function togglePanel(btn) {
    const content = btn.nextElementSibling;
    const collapsed = content.classList.toggle('collapsed');
    btn.classList.toggle('collapsed', collapsed);
}

// ===================================================
//  SETTINGS BINDING
// ===================================================
const SETTING_MAP = {
    s_currentAge:       ['currentAge',       'int'],
    s_initialAssets:    ['initialAssets',    'float'],
    s_inflationRate:    ['inflationRate',    'float'],
    s_investmentReturn: ['investmentReturn', 'float'],
    s_debtRate:         ['debtRate',         'float'],
    s_salary:           ['salary',           'float'],
    s_salaryGrowth:     ['salaryGrowth',     'float'],
    s_workStartAge:     ['workStartAge',     'int'],
    s_retirementAge:    ['retirementAge',    'int'],
    s_pension:          ['pension',          'float'],
    s_pensionStartAge:  ['pensionStartAge',  'int'],
    s_livingCost:       ['livingCost',       'float'],
    s_housingCost:      ['housingCost',      'float'],
};

function bindSettings() {
    for (const [elId, [key, type]] of Object.entries(SETTING_MAP)) {
        const el = document.getElementById(elId);
        if (!el) continue;
        el.value = settings[key];
        el.addEventListener('input', () => {
            settings[key] = type === 'int'
                ? (parseInt(el.value)   || 0)
                : (parseFloat(el.value) || 0);
            renderAll();
        });
    }
}

// ===================================================
//  LOCALSTORAGE
// ===================================================
const STORAGE_KEY = 'lifesim_v2_5';

function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ settings, lifeEvents, nextEventId }));
    } catch (e) { /* ignore */ }
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (data.settings)     settings     = { ...settings, ...data.settings };
        if (data.lifeEvents)   lifeEvents   = data.lifeEvents;
        if (data.nextEventId)  nextEventId  = data.nextEventId;
    } catch (e) { /* ignore */ }
}

function resetData() {
    if (!confirm('全ての設定とイベントをリセットしますか？')) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
}

// ===================================================
//  JSON EXPORT / IMPORT
// ===================================================
function downloadJSON() {
    const now = new Date();
    const year  = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day   = String(now.getDate()).padStart(2, '0');
    const filename = `${year}_${month}_${day}_shisan_sim.json`;

    const data = {
        timestamp: now.toISOString(),
        settings: settings,
        lifeEvents: lifeEvents,
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`✅ ${filename} をダウンロードしました。`);
}

function uploadJSON(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.settings || !Array.isArray(data.lifeEvents)) {
                alert('❌ ファイル形式が正しくありません。');
                return;
            }

            settings = { ...settings, ...data.settings };
            lifeEvents = data.lifeEvents;

            // Update nextEventId
            if (lifeEvents.length > 0) {
                nextEventId = Math.max(...lifeEvents.map(e => e.id)) + 1;
            }

            // UI を更新
            bindSettings();
            renderEventList();
            renderAll();

            alert(`✅ ${file.name} を読み込みました。`);
        } catch (err) {
            alert(`❌ ファイル読み込みエラー: ${err.message}`);
        }
    };
    reader.readAsText(file);

    // ファイル入力をリセット（同じファイルを再度選択可能に）
    event.target.value = '';
}

// ===================================================
//  KEYBOARD / OVERLAY CLOSE
// ===================================================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ===================================================
//  NAV ACTIVE STATE
// ===================================================
(function markActiveNav() {
    const file = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(a => {
        if (a.getAttribute('href') === file) a.classList.add('active');
    });
})();

// ===================================================
//  INIT
// ===================================================
(function init() {
    loadFromStorage();
    bindSettings();
    renderEventList();
    renderAll();
})();
