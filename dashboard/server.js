import http from 'http';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cfg       = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const PORT      = 3737;

// ===================================================
//  WordPress API Helper
// ===================================================
const WP_CRED = Buffer.from(`${cfg.wordpress.username}:${cfg.wordpress.appPassword}`).toString('base64');

async function wpApi(method, endpoint, data = null) {
  const url  = `${cfg.wordpress.baseUrl}/wp-json/wp/v2/${endpoint}`;
  const opts = {
    method,
    headers: { Authorization: `Basic ${WP_CRED}`, 'Content-Type': 'application/json' },
    ...(data ? { body: JSON.stringify(data) } : {}),
  };
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`WP API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function wpUploadImage(filePath, filename) {
  const data = fs.readFileSync(filePath);
  const res  = await fetch(`${cfg.wordpress.baseUrl}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${WP_CRED}`,
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
    body: data,
  });
  if (!res.ok) throw new Error(`Upload error ${res.status}: ${await res.text()}`);
  return res.json();
}

// ===================================================
//  Git Helpers  (JST: UTC+9)
// ===================================================
function jstToUtcRange(dateStr) {
  // dateStr: "YYYY-MM-DD" in JST
  const after  = new Date(`${dateStr}T00:00:00+09:00`).toISOString();
  const before = new Date(`${dateStr}T23:59:59+09:00`).toISOString();
  return { after, before };
}

function getCommits(dateStr) {
  const { after, before } = jstToUtcRange(dateStr);
  const repoPath = cfg.repo.path;
  const raw = execSync(
    `git -C "${repoPath}" log --after="${after}" --before="${before}" ` +
    `--format="%H|%ad|%s" --date=format:"%H:%M"`,
    { encoding: 'utf8' }
  ).trim();
  if (!raw) return [];
  return raw.split('\n').map(line => {
    const [hash, time, ...msgParts] = line.split('|');
    return { hash, time, message: msgParts.join('|') };
  });
}

function getCommitFiles(hash) {
  const repoPath = cfg.repo.path;
  const raw = execSync(
    `git -C "${repoPath}" show --name-only --format="" ${hash}`,
    { encoding: 'utf8' }
  ).trim();
  return raw.split('\n').filter(Boolean);
}

function getCommitDiff(hash) {
  const repoPath = cfg.repo.path;
  try {
    return execSync(
      `git -C "${repoPath}" show ${hash} --unified=3 --no-color`,
      { encoding: 'utf8', maxBuffer: 1024 * 1024 * 5 }
    );
  } catch { return ''; }
}

// ===================================================
//  Page URL Detection (git file → GitHub Pages URL)
// ===================================================
function filesToPageUrls(allFiles) {
  const htmlRoot = cfg.github.htmlDir;   // "html_ver"
  const base     = cfg.github.pagesBase; // "https://kiyo4810.github.io/autocal"
  const urls     = new Set();

  for (const f of allFiles) {
    if (!f.startsWith(htmlRoot + '/')) continue;
    const rel = f.slice(htmlRoot.length + 1); // e.g. "index2-5.html" or "class_accordion/index.html"

    if (f.endsWith('.html')) {
      const url = rel.endsWith('index.html')
        ? `${base}/${htmlRoot}/${rel.replace('index.html', '')}`
        : `${base}/${htmlRoot}/${rel}`;
      urls.add(url.replace(/\/$/, '') + (rel.endsWith('index.html') ? '/' : ''));
    } else {
      // .js/.css → find parent dir's index.html
      const dir    = path.dirname(f);
      const idxAbs = path.join(cfg.repo.path, dir, 'index.html');
      if (fs.existsSync(idxAbs)) {
        const relDir = dir.slice(htmlRoot.length + 1);
        urls.add(`${base}/${htmlRoot}/${relDir}/`);
      }
    }
  }
  return [...urls];
}

// ===================================================
//  Screenshot
// ===================================================
async function takeScreenshots(urls, emit) {
  const results = [];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  for (const url of urls) {
    emit(`📸 スクリーンショット取得中: ${url}`);
    const page     = await context.newPage();
    const tmpFile  = `/tmp/ss_${Date.now()}.png`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: tmpFile, fullPage: false });
      const stat = fs.statSync(tmpFile);
      emit(`  ✅ 保存完了 (${Math.round(stat.size / 1024)}KB)`);
      results.push({ url, file: tmpFile });
    } catch (e) {
      emit(`  ⚠️ スクショ失敗: ${e.message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
  return results;
}

// ===================================================
//  Category Auto-detection
// ===================================================
function detectCategories(allFiles, allMessages) {
  const cats = new Set([cfg.wordpress_categories.programming]); // 常にプログラミング
  const msg  = allMessages.join(' ').toLowerCase();
  const files = allFiles.join(' ').toLowerCase();

  if (files.includes('.js'))                       cats.add(cfg.wordpress_categories.javascript);
  if (files.includes('.html'))                     cats.add(cfg.wordpress_categories.html);
  if (files.includes('.css'))                      cats.add(cfg.wordpress_categories.css);
  if (msg.includes('claude'))                      cats.add(cfg.wordpress_categories.claudeCode);

  // max 4
  return [...cats].slice(0, 4);
}

// ===================================================
//  WordPress Tag Helper
// ===================================================
async function getOrCreateTag(name) {
  // per_page=100 で取りこぼしを減らす
  const found = await wpApi('GET', `tags?search=${encodeURIComponent(name)}&per_page=100`);
  const exact = found.find(t => t.name === name);
  if (exact) return exact.id;

  // wpApi は !res.ok で throw してしまうので、タグ作成は直接 fetch する。
  // term_exists (400) の場合 WP は JSON で term_id を返すのでそれを使う。
  const res  = await fetch(`${cfg.wordpress.baseUrl}/wp-json/wp/v2/tags`, {
    method:  'POST',
    headers: { Authorization: `Basic ${WP_CRED}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name }),
  });
  const json = await res.json();

  if (res.ok) return json.id;

  // term_exists → data.term_id をそのまま返す
  if (json.code === 'term_exists' && json.data?.term_id) {
    return json.data.term_id;
  }

  throw new Error(`タグ作成失敗 ${res.status}: ${JSON.stringify(json)}`);
}

// ===================================================
//  Next Day Number
// ===================================================
async function getNextDayNumber() {
  const [pub, drafts] = await Promise.all([
    wpApi('GET', 'posts?status=publish&per_page=20&orderby=date&order=desc'),
    wpApi('GET', 'posts?status=draft&per_page=20&orderby=date&order=desc'),
  ]);
  let max = 0;
  for (const p of [...pub, ...drafts]) {
    const m = p.title.rendered.match(/Day(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1]));
  }
  return max + 1;
}

// ===================================================
//  Article Content Generator
// ===================================================
function extractAddedCode(diff, maxLines = 25) {
  const lines = diff.split('\n')
    .filter(l => l.startsWith('+') && !l.startsWith('+++'))
    .map(l => l.slice(1))
    .filter(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('*'));
  return lines.slice(0, maxLines).join('\n');
}

// 見出しに使うやさしい関西弁サフィックス（ランダムに付ける）
const KANSAI_SUFFIX = ['やで', 'やん', 'やわ', 'やな', 'やんか'];
function kansai() { return KANSAI_SUFFIX[Math.floor(Math.random() * KANSAI_SUFFIX.length)]; }

function buildArticleContent(commits, screenshots) {
  const SIM_WORDS   = ['シミュ', 'シミュレーター', 'simulate', 'index2-'];
  const CLASS_WORDS = ['class', 'クラス', 'accordion', 'アコーディオン', 'instance'];
  const FIX_WORDS   = ['fix', 'バグ', '修正', '直す', 'fixed', 'modal', 'モーダル'];
  const FEAT_WORDS  = ['追加', 'add', '実装', 'new', '新規', '対応'];

  // コミットにテーマを付ける
  const themed = commits.map(c => {
    const msg = c.message.toLowerCase();
    const files = (c.files || []).join(' ').toLowerCase();
    const all   = msg + ' ' + files;
    const theme = all.includes('class') || all.includes('accordion') ? 'class'
                : all.includes('シミュ') || all.includes('simulate') || all.includes('index2-') ? 'simulator'
                : all.includes('ogp') ? 'ogp'
                : all.includes('modal') || all.includes('モーダル') ? 'modal'
                : all.includes('css') || files.includes('.css') ? 'css'
                : 'general';
    return { ...c, theme };
  });

  // グループ化（同テーマを連続させる）
  const groups = {};
  for (const c of themed) {
    (groups[c.theme] = groups[c.theme] || []).push(c);
  }

  const totalCommits = commits.length;
  const themeNames   = [...new Set(themed.map(c => c.theme))];

  // ===== 冒頭 =====
  let html = `<!-- wp:paragraph -->
<p>本日は計${totalCommits}件のコミットで作業を進めました。内容は${themeNames.map(t => ({
    class: 'JavaScriptクラス構文の学習',
    simulator: '生涯収支シミュレーターの改修',
    ogp: 'OGP設定',
    modal: 'モーダルUI改善',
    css: 'CSSの調整',
    general: 'その他の実装',
  }[t] || t)).join('・')}です。</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

`;

  // ===== テーマ別セクション =====
  const THEME_LABELS = {
    class:      `JavaScriptのclassを使ってみたで`,
    simulator:  `生涯収支シミュレーターを改修した話`,
    ogp:        `OGP画像の設定をしたで`,
    modal:      `モーダルのUI問題を直したで`,
    css:        `CSSをいじった話`,
    general:    `その他の実装`,
  };

  let sectionIndex = 1;

  for (const [theme, cs] of Object.entries(groups)) {
    const label = THEME_LABELS[theme] || theme;
    const allMessages = cs.map(c => c.message).join(' / ');
    const timeRange   = cs.length > 1
      ? `${cs[cs.length - 1].time} 〜 ${cs[0].time}`
      : cs[0].time;

    html += `<!-- wp:heading -->
<h2 class="wp-block-heading">${numberToCircle(sectionIndex)}　${label}（${timeRange}）</h2>
<!-- /wp:heading -->

`;

    // コミットごとのサブセクション
    for (const c of [...cs].reverse()) { // 古い順に
      const diff      = getCommitDiff(c.hash);
      const addedCode = extractAddedCode(diff, 30);
      const filesStr  = (c.files || []).filter(f => !f.endsWith('.md')).join(', ');
      const isNew     = FEAT_WORDS.some(w => c.message.includes(w));
      const isFix     = FIX_WORDS.some(w => c.message.toLowerCase().includes(w));
      const verb      = isFix ? '修正' : isNew ? '追加・実装' : '更新';

      html += `<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">${escHtml(c.message)}（${c.time}）</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>変更ファイル：<code>${escHtml(filesStr)}</code></p>
<!-- /wp:paragraph -->

`;
      if (addedCode.trim()) {
        html += `<!-- wp:code -->
<pre class="wp-block-code"><code>${escHtml(addedCode)}</code></pre>
<!-- /wp:code -->

`;
      }

      // テーマ別の技術コメントを追加
      const comment = getTechComment(theme, c.message, diff);
      if (comment) {
        html += `<!-- wp:paragraph -->
<p>${comment}</p>
<!-- /wp:paragraph -->

`;
      }
    }

    // スクショがこのテーマのページに対応していれば挿入
    const relatedSS = screenshots.filter(ss => matchesTheme(ss.url, theme));
    for (const ss of relatedSS) {
      if (ss.mediaId) {
        html += `<!-- wp:image {"id":${ss.mediaId},"sizeSlug":"medium","linkDestination":"custom"} -->
<figure class="wp-block-image size-medium"><a href="${ss.url}" target="_blank" rel="noreferrer noopener"><img src="${ss.mediaUrl}" class="wp-image-${ss.mediaId}" alt="${escHtml(ss.url)}のスクリーンショット"/></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>👉 <a href="${ss.url}" target="_blank" rel="noreferrer noopener">${ss.url}</a></p>
<!-- /wp:paragraph -->

`;
      }
    }

    html += `<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

`;
    sectionIndex++;
  }

  // ===== 振り返り =====
  html += `<!-- wp:heading -->
<h2 class="wp-block-heading">今日の振り返り</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>コミット${totalCommits}本でまとまった実装ができました。各変更の意図を理解しながら進めることで、コードの構造に対する理解が深まってきています。</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:heading -->
<h2 class="wp-block-heading">今日の成果物 🎉</h2>
<!-- /wp:heading -->

`;

  // 全スクショへのリンク
  for (const ss of screenshots) {
    if (ss.mediaId) {
      html += `<!-- wp:image {"id":${ss.mediaId},"sizeSlug":"medium","linkDestination":"custom"} -->
<figure class="wp-block-image size-medium"><a href="${ss.url}" target="_blank" rel="noreferrer noopener"><img src="${ss.mediaUrl}" class="wp-image-${ss.mediaId}" alt="成果物スクリーンショット"/></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>👉 <a href="${ss.url}" target="_blank" rel="noreferrer noopener">${ss.url}</a></p>
<!-- /wp:paragraph -->

`;
    } else {
      html += `<!-- wp:paragraph -->
<p>👉 <a href="${ss.url}" target="_blank" rel="noreferrer noopener">${ss.url}</a></p>
<!-- /wp:paragraph -->

`;
    }
  }

  return html;
}

function matchesTheme(url, theme) {
  const u = url.toLowerCase();
  if (theme === 'simulator') return u.includes('index2-') || u.includes('sim');
  if (theme === 'class')     return u.includes('class') || u.includes('accordion');
  return false;
}

function getTechComment(theme, message, diff) {
  const msg = message.toLowerCase();
  if (theme === 'class') {
    if (diff.includes('constructor')) return 'classの<code>constructor</code>で初期化処理を定義し、メソッドで動作を実装する構造です。インスタンスを複数生成することで、同じ機能のUI部品を少ないコードで量産できます。';
    if (diff.includes('addEventListener')) return '<code>addEventListener</code>をclassのメソッドとして定義することで、イベント処理の再利用が可能になります。';
  }
  if (theme === 'simulator') {
    if (diff.includes('formatWan') || msg.includes('値段') || msg.includes('表記')) return '万円単位の金額表示には<code>formatWan()</code>関数を使用。1億以上の場合は「2億3,456万円」のように億・万の単位を組み合わせて表示します。';
    if (diff.includes('investmentAssets') || msg.includes('資産')) return '投資資産と現金資産を別々のパラメータで管理することで、それぞれに異なる利回りを適用したより現実的なシミュレーションが可能になりました。';
    if (diff.includes('JSON') || msg.includes('json') || msg.includes('ダウン') || msg.includes('アップ')) return 'JSONによる設定の保存・復元機能を追加。<code>FileReader</code>と<code>Blob</code>を組み合わせ、ブラウザのみで完結するエクスポート・インポートを実現しています。';
  }
  if (theme === 'modal') return '<code>min-height: 0</code>はflexコンテナ内でスクロールを有効にするための重要な指定です。これを省略すると<code>overflow: auto</code>が機能しない場合があります。';
  if (theme === 'ogp') return 'OGP（Open Graph Protocol）タグを追加することで、SNSシェア時のサムネイル・タイトル・説明文を制御できます。';
  return '';
}

function numberToCircle(n) {
  const circles = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'];
  return circles[n - 1] || `(${n})`;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ===================================================
//  Title Generator
// ===================================================
function generateTitle(commits, dayNum) {
  const allMsg   = commits.map(c => c.message).join(' ');
  const allFiles = commits.flatMap(c => c.files || []).join(' ');
  const all      = (allMsg + ' ' + allFiles).toLowerCase();

  let core = '';
  if (all.includes('class') && all.includes('シミュ'))
    core = `classと資産シミュ、両方${kansai()}！`;
  else if (all.includes('json') && all.includes('シミュ'))
    core = `JSON保存もできる資産シミュに進化${kansai()}！`;
  else if (all.includes('class') || all.includes('accordion'))
    core = `classでコンポーネントを量産${kansai()}！`;
  else if (all.includes('シミュ') || all.includes('simulate'))
    core = `資産シミュを大改造${kansai()}！`;
  else if (all.includes('modal') || all.includes('モーダル'))
    core = `モーダルのスクロール問題を解決${kansai()}！`;
  else {
    const words = allMsg.replace(/\s+/g, '').slice(0, 12);
    core = `${words}${kansai()}！`;
  }

  // 20文字前後に調整
  if (core.length > 22) core = core.slice(0, 20) + '！';

  return `${core}【Day${dayNum} of 100】`;
}

// ===================================================
//  Auto Tags
// ===================================================
function detectTagNames(commits) {
  const all = commits.map(c => c.message + ' ' + (c.files || []).join(' ')).join(' ').toLowerCase();
  const candidates = [];

  if (all.includes('class') || all.includes('クラス'))          candidates.push('JavaScriptクラス構文');
  if (all.includes('accordion') || all.includes('アコーディオン')) candidates.push('アコーディオン');
  if (all.includes('シミュ') || all.includes('simulate'))       candidates.push('生涯収支シミュレーター');
  if (all.includes('json'))                                      candidates.push('JSONエクスポート');
  if (all.includes('modal') || all.includes('モーダル'))         candidates.push('モーダル');
  if (all.includes('css') || all.includes('スタイル'))           candidates.push('CSS');
  if (all.includes('ogp'))                                       candidates.push('OGP');
  if (all.includes('claude'))                                    candidates.push('Claude Code');
  if (all.includes('flex'))                                      candidates.push('CSS Flexbox');

  // 必ず3つ返す
  while (candidates.length < 3) candidates.push(['JavaScript', 'プログラミング', 'Web開発'][candidates.length]);
  return candidates.slice(0, 3);
}

// ===================================================
//  Main Generation Pipeline
// ===================================================
async function generate(dateStr, emit) {
  try {
    emit('🔍 gitコミットを取得中...');
    const commits = getCommits(dateStr);
    if (commits.length === 0) {
      emit(`⚠️ ${dateStr} のコミットは見つかりませんでした`);
      return null;
    }
    emit(`✅ ${commits.length}件のコミットを検出`);
    commits.forEach(c => emit(`   ${c.time}  ${c.message}`));

    // ファイル一覧を取得
    emit('\n📂 変更ファイルを解析中...');
    for (const c of commits) {
      c.files = getCommitFiles(c.hash);
    }
    const allFiles    = [...new Set(commits.flatMap(c => c.files))];
    const allMessages = commits.map(c => c.message);
    emit(`   変更ファイル数: ${allFiles.length}`);

    // ページURL特定
    const pageUrls = filesToPageUrls(allFiles);
    emit(`\n🌐 GitHub Pages URL: ${pageUrls.length}件`);
    pageUrls.forEach(u => emit(`   ${u}`));

    // スクリーンショット
    emit('\n📸 スクリーンショットを撮影中...');
    const screenshots = await takeScreenshots(pageUrls, emit);

    // WordPress media アップロード
    emit('\n☁️  WordPress にアップロード中...');
    for (const ss of screenshots) {
      const safeName = ss.url.replace(/[^a-zA-Z0-9]/g, '_').slice(-40) + '.png';
      try {
        const res  = await wpUploadImage(ss.file, `ss_${dateStr}_${safeName}`);
        ss.mediaId  = res.id;
        ss.mediaUrl = res.source_url;
        emit(`   ✅ ID:${res.id}  ${ss.url}`);
      } catch (e) {
        emit(`   ⚠️ アップロード失敗: ${e.message}`);
      }
    }

    // Day番号
    emit('\n🔢 Day番号を確認中...');
    const dayNum = await getNextDayNumber();
    emit(`   → Day${dayNum} を使用`);

    // カテゴリ
    const categories = detectCategories(allFiles, allMessages);
    emit(`\n🏷️  カテゴリ: ${categories.join(', ')}`);

    // タグ
    emit('🔖 タグを生成中...');
    const tagNames = detectTagNames(commits);
    const tagIds   = [];
    for (const name of tagNames) {
      const id = await getOrCreateTag(name);
      tagIds.push(id);
      emit(`   「${name}」 → ID:${id}`);
    }

    // 記事本文生成
    emit('\n✍️  記事本文を生成中...');
    const content = buildArticleContent(commits, screenshots);

    // タイトル
    const title = generateTitle(commits, dayNum);
    emit(`\n📝 タイトル: ${title}`);

    // Featured image (最初のスクショ)
    const featuredMedia = screenshots.find(ss => ss.mediaId)?.mediaId ?? 0;

    // 投稿日を対象日の23:59に設定
    const postDate = `${dateStr}T23:59:00`;

    // WordPress 下書き作成
    emit('\n🚀 WordPress に下書きを投稿中...');
    const post = await wpApi('POST', 'posts', {
      title,
      content,
      status:          'draft',
      date:            postDate,
      categories,
      tags:            tagIds,
      featured_media:  featuredMedia,
    });

    const editUrl = `${cfg.wordpress.baseUrl}/wp-admin/post.php?post=${post.id}&action=edit`;
    emit(`\n🎉 完成！`);
    emit(`   投稿ID  : ${post.id}`);
    emit(`   タイトル: ${title}`);
    emit(`   Day番号 : Day${dayNum}`);
    emit(`   カテゴリ: ${categories.length}個`);
    emit(`   タグ    : ${tagIds.length}個`);
    emit(`   画像    : ${screenshots.filter(s => s.mediaId).length}枚`);
    emit(`   編集URL : ${editUrl}`);

    return { id: post.id, title, editUrl, dayNum, screenshots: screenshots.length };
  } catch (err) {
    emit(`\n❌ エラー: ${err.message}`);
    console.error(err);
    return null;
  }
}

// ===================================================
//  HTTP Server
// ===================================================
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // 静的ファイル
  if (url.pathname === '/' || url.pathname === '/index.html') {
    const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // API: 最新Day番号
  if (url.pathname === '/api/latest-day') {
    try {
      const day = await getNextDayNumber();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ day }));
    } catch (e) {
      res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // API: WordPress 疎通確認
  if (url.pathname === '/api/status') {
    try {
      await wpApi('GET', 'users/me');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
    return;
  }

  // API: 生成（SSE）
  if (url.pathname === '/api/generate') {
    const dateStr = url.searchParams.get('date') || getTodayJST();

    res.writeHead(200, {
      'Content-Type':  'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });

    const emit = (msg) => {
      res.write(`data: ${JSON.stringify({ type: 'log', msg })}\n\n`);
    };

    const result = await generate(dateStr, emit);
    if (result) {
      res.write(`data: ${JSON.stringify({ type: 'done', result })}\n\n`);
    } else {
      res.write(`data: ${JSON.stringify({ type: 'error' })}\n\n`);
    }
    res.end();
    return;
  }

  res.writeHead(404); res.end('Not Found');
});

function getTodayJST() {
  const d = new Date();
  d.setTime(d.getTime() + 9 * 60 * 60 * 1000); // UTC → JST
  return d.toISOString().slice(0, 10);
}

server.listen(PORT, () => {
  console.log(`\n✅ ブログ下書きダッシュボード起動`);
  console.log(`   http://localhost:${PORT}\n`);
});
