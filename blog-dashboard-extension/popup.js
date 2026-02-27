const DASHBOARD_URL  = 'http://localhost:3737';
const NATIVE_HOST    = 'com.blogdashboard.launcher';
const START_TIMEOUT  = 12; // seconds

const btn    = document.getElementById('btn');
const status = document.getElementById('status');

// ── ステータス表示ヘルパー ──────────────────────────────────────────
function setStatus(msg, cls = '') {
  status.className = cls;
  status.innerHTML = msg;
}

// ── サーバー疎通確認（1.5秒タイムアウト） ─────────────────────────
async function isServerRunning() {
  try {
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1500);
    await fetch(DASHBOARD_URL, { signal: ctrl.signal });
    clearTimeout(timer);
    return true;
  } catch {
    return false;
  }
}

// ── ダッシュボードタブを開く or フォーカス ────────────────────────
async function openDashboard() {
  const tabs = await chrome.tabs.query({});
  const existing = tabs.find(t => t.url && t.url.startsWith(DASHBOARD_URL));
  if (existing) {
    await chrome.tabs.update(existing.id, { active: true });
    await chrome.windows.update(existing.windowId, { focused: true });
  } else {
    await chrome.tabs.create({ url: DASHBOARD_URL });
  }
  window.close();
}

// ── Native Messaging でサーバー起動 ──────────────────────────────
function sendNativeStart() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendNativeMessage(NATIVE_HOST, { action: 'start' }, (res) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(res);
      }
    });
  });
}

// ── 起動待機（ポーリング） ────────────────────────────────────────
async function waitForServer(maxSec) {
  for (let i = 1; i <= maxSec; i++) {
    await new Promise(r => setTimeout(r, 1000));
    setStatus(`<span class="spinner"></span>起動待機中... ${i}s`);
    if (await isServerRunning()) return true;
  }
  return false;
}

// ── メインロジック ────────────────────────────────────────────────
async function launch() {
  btn.disabled = true;
  setStatus('<span class="spinner"></span>サーバー確認中...');

  // 既に起動していれば即開く
  if (await isServerRunning()) {
    setStatus('<span class="dot green"></span>起動済み。開いています...', 'ok');
    await openDashboard();
    return;
  }

  // Native Host 経由でサーバー起動
  setStatus('<span class="spinner"></span>サーバーを起動中...');
  try {
    await sendNativeStart();
  } catch (e) {
    setStatus(
      '❌ Native host 未設定<br><small style="color:#888">native-host/install.sh を実行してください</small>',
      'err'
    );
    btn.disabled = false;
    return;
  }

  // 起動を待つ
  const ok = await waitForServer(START_TIMEOUT);
  if (ok) {
    setStatus('<span class="dot green"></span>起動完了！開いています...', 'ok');
    await openDashboard();
  } else {
    setStatus('❌ タイムアウト。サーバーログを確認してください。', 'err');
    btn.disabled = false;
  }
}

// ── 初期チェック（ポップアップ開いた時点でサーバー状態を表示） ──
(async () => {
  const running = await isServerRunning();
  if (running) {
    setStatus('<span class="dot green"></span>サーバー起動中', 'ok');
  } else {
    setStatus('<span class="dot red"></span>サーバー停止中');
  }
})();

btn.addEventListener('click', launch);
