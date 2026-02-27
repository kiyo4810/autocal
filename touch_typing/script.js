/* =============================================
   Brooklyn Industrial Touch Typing Tutor
   script.js — Main Logic
   ============================================= */

'use strict';

/* ============================================================
   CONFIG — All tunable parameters and data in one place
   ============================================================ */
const Config = {
  /* --- Word / Snippet Data --- */
  words: {
    javascript: {
      normal: [
        'function','const','let','var','return','if','else','for','while','switch',
        'case','break','continue','new','this','class','extends','super','import',
        'export','default','async','await','try','catch','finally','throw','typeof',
        'instanceof','null','undefined','true','false','console','log','error','warn',
        'array','object','string','number','boolean','promise','resolve','reject',
        'then','catch','finally','map','filter','reduce','forEach','find','some',
        'every','includes','indexOf','push','pop','shift','unshift','splice','slice',
        'join','split','trim','replace','match','search','parseInt','parseFloat',
        'JSON','parse','stringify','window','document','querySelector','addEventListener',
        'fetch','response','request','callback','closure','prototype','constructor'
      ],
      symbols: [
        'const fn = () => {}',
        'arr.map(x => x * 2)',
        '(a, b) => a + b',
        '${variable}',
        'obj?.prop',
        'a ?? b',
        '...spread',
        '[...arr]',
        '{key: value}',
        'async/await',
        '() => {}',
        'a && b || c',
        'x !== null',
        '`template ${str}`',
        'arr[0]',
        'fn(arg1, arg2)',
        '{ destructure }',
        'import { x } from "y"',
        'export default fn',
        '() => ({ key })'
      ]
    },
    typescript: {
      normal: [
        'interface','type','enum','namespace','declare','abstract','implements',
        'readonly','private','public','protected','static','override','never',
        'unknown','any','void','string','number','boolean','object','symbol',
        'bigint','Record','Partial','Required','Pick','Omit','Exclude','Extract',
        'NonNullable','ReturnType','Parameters','ConstructorParameters','Awaited',
        'Promise','Array','Tuple','Union','Intersection','Generic','keyof','typeof',
        'infer','extends','satisfies','as','is','in','of'
      ],
      symbols: [
        'type Fn = () => void',
        'interface Props {}',
        'T extends object',
        'Record<string, number>',
        'Partial<Type>',
        'arr as string[]',
        '(x: number): void',
        'readonly key: string',
        'x is string',
        '?? undefined',
        '<T>(arg: T): T',
        'keyof typeof obj',
        '{ [K in keyof T]: }',
        'Promise<void>',
        'Awaited<ReturnType<F>>'
      ]
    },
    html: {
      normal: [
        'div','span','p','h1','h2','h3','section','article','header','footer',
        'nav','main','aside','ul','ol','li','a','img','input','button','form',
        'label','select','option','textarea','table','thead','tbody','tr','td','th',
        'class','id','href','src','alt','type','value','name','placeholder',
        'data-','aria-','role','tabindex','disabled','checked','required','action',
        'method','enctype','style','script','link','meta','title','head','body',
        'DOCTYPE','html','charset','viewport','content'
      ],
      symbols: [
        '<div class="">',
        '</div>',
        '<img src="" alt="" />',
        '<a href="#">',
        'data-id="value"',
        'aria-label=""',
        'class="flex gap-4"',
        '<!-- comment -->',
        '&amp; &lt; &gt;',
        '<input type="text" />',
        '<button onClick="">',
        'style="color: #fff"',
        '<link rel="stylesheet" />',
        'xmlns="http://www.w3.org"',
        '<!DOCTYPE html>'
      ]
    },
    react: {
      normal: [
        'useState','useEffect','useRef','useCallback','useMemo','useContext',
        'useReducer','useLayoutEffect','useImperativeHandle','useDebugValue',
        'createContext','forwardRef','memo','Component','PureComponent',
        'Fragment','StrictMode','Suspense','lazy','createRef','cloneElement',
        'createElement','render','hydrate','unmountComponentAtNode',
        'props','state','children','key','ref','defaultProps','displayName',
        'componentDidMount','componentDidUpdate','componentWillUnmount',
        'getDerivedStateFromProps','shouldComponentUpdate','getSnapshotBeforeUpdate'
      ],
      symbols: [
        'const [state, setState] = useState()',
        'useEffect(() => {}, [])',
        '<Component prop={value} />',
        '{children}',
        'className="btn"',
        'onClick={() => fn()}',
        'onChange={(e) => {}}',
        'key={item.id}',
        'ref={myRef}',
        'style={{ color: "#fff" }}',
        'React.FC<Props>',
        '() => <div />',
        'export default function App()',
        '{condition && <El />}',
        '{items.map((i) => <Li key={i.id} />)}'
      ]
    }
  },

  /* --- JIS Keyboard Layout Definition ---
     Each key: { code, label, shift?, width, finger }
     width: '1'=46px, '1.25', '1.5', '1.75', '2', '2.25', '2.75', '3', '6', '6.25'
     finger: 'lp'|'lr'|'lm'|'li'|'lt'|'rt'|'ri'|'rm'|'rr'|'rp'
  ============================================================ */
  jisRows: [
    /* Row 0 — Number row */
    [
      { code:'Backquote',    label:'半角\n全角',  shift:'`',       w:'1',    finger:'lp', special:true },
      { code:'Digit1',       label:'1',          shift:'!',       w:'1',    finger:'lp' },
      { code:'Digit2',       label:'2',          shift:'"',       w:'1',    finger:'lr' },
      { code:'Digit3',       label:'3',          shift:'#',       w:'1',    finger:'lm' },
      { code:'Digit4',       label:'4',          shift:'$',       w:'1',    finger:'li' },
      { code:'Digit5',       label:'5',          shift:'%',       w:'1',    finger:'li' },
      { code:'Digit6',       label:'6',          shift:'&',       w:'1',    finger:'ri' },
      { code:'Digit7',       label:'7',          shift:"'",       w:'1',    finger:'ri' },
      { code:'Digit8',       label:'8',          shift:'(',       w:'1',    finger:'rm' },
      { code:'Digit9',       label:'9',          shift:')',       w:'1',    finger:'rr' },
      { code:'Digit0',       label:'0',          shift:'',        w:'1',    finger:'rp' },
      { code:'Minus',        label:'-',          shift:'=',       w:'1',    finger:'rp' },
      { code:'Equal',        label:'^',          shift:'~',       w:'1',    finger:'rp' },
      { code:'IntlYen',      label:'¥',          shift:'|',       w:'1',    finger:'rp' },
      { code:'Backspace',    label:'⌫',          shift:'',        w:'2',    finger:'rp', special:true }
    ],
    /* Row 1 — QWERTY row */
    [
      { code:'Tab',          label:'⇥ Tab',      shift:'',        w:'1.5',  finger:'lp', special:true },
      { code:'KeyQ',         label:'Q',          shift:'',        w:'1',    finger:'lp' },
      { code:'KeyW',         label:'W',          shift:'',        w:'1',    finger:'lr' },
      { code:'KeyE',         label:'E',          shift:'',        w:'1',    finger:'lm' },
      { code:'KeyR',         label:'R',          shift:'',        w:'1',    finger:'li' },
      { code:'KeyT',         label:'T',          shift:'',        w:'1',    finger:'li' },
      { code:'KeyY',         label:'Y',          shift:'',        w:'1',    finger:'ri' },
      { code:'KeyU',         label:'U',          shift:'',        w:'1',    finger:'ri' },
      { code:'KeyI',         label:'I',          shift:'',        w:'1',    finger:'rm' },
      { code:'KeyO',         label:'O',          shift:'',        w:'1',    finger:'rr' },
      { code:'KeyP',         label:'P',          shift:'',        w:'1',    finger:'rp' },
      { code:'BracketLeft',  label:'@',          shift:'`',       w:'1',    finger:'rp' },
      { code:'BracketRight', label:'[',          shift:'{',       w:'1',    finger:'rp' },
      /* Enter key is drawn as reverse-L — spans rows 1 & 2 */
      { code:'Enter',        label:'Enter',      shift:'',        w:'enter',finger:'rp', special:true }
    ],
    /* Row 2 — Home row */
    [
      { code:'CapsLock',     label:'Caps',       shift:'',        w:'1.75', finger:'lp', special:true },
      { code:'KeyA',         label:'A',          shift:'',        w:'1',    finger:'lp', home:true },
      { code:'KeyS',         label:'S',          shift:'',        w:'1',    finger:'lr', home:true },
      { code:'KeyD',         label:'D',          shift:'',        w:'1',    finger:'lm', home:true },
      { code:'KeyF',         label:'F',          shift:'',        w:'1',    finger:'li', home:true },
      { code:'KeyG',         label:'G',          shift:'',        w:'1',    finger:'li' },
      { code:'KeyH',         label:'H',          shift:'',        w:'1',    finger:'ri' },
      { code:'KeyJ',         label:'J',          shift:'',        w:'1',    finger:'ri', home:true },
      { code:'KeyK',         label:'K',          shift:'',        w:'1',    finger:'rm', home:true },
      { code:'KeyL',         label:'L',          shift:'',        w:'1',    finger:'rr', home:true },
      { code:'Semicolon',    label:';',          shift:'+',       w:'1',    finger:'rp', home:true },
      { code:'Quote',        label:':',          shift:'*',       w:'1',    finger:'rp' },
      { code:'Backslash',    label:']',          shift:'}',       w:'1',    finger:'rp' },
      /* Enter bottom part — handled by enter-jis drawing */
    ],
    /* Row 3 — Z row */
    [
      { code:'ShiftLeft',    label:'⇧',          shift:'',        w:'2.25', finger:'lp', special:true },
      { code:'KeyZ',         label:'Z',          shift:'',        w:'1',    finger:'lp' },
      { code:'KeyX',         label:'X',          shift:'',        w:'1',    finger:'lr' },
      { code:'KeyC',         label:'C',          shift:'',        w:'1',    finger:'lm' },
      { code:'KeyV',         label:'V',          shift:'',        w:'1',    finger:'li' },
      { code:'KeyB',         label:'B',          shift:'',        w:'1',    finger:'li' },
      { code:'KeyN',         label:'N',          shift:'',        w:'1',    finger:'ri' },
      { code:'KeyM',         label:'M',          shift:'',        w:'1',    finger:'ri' },
      { code:'Comma',        label:',',          shift:'<',       w:'1',    finger:'rm' },
      { code:'Period',       label:'.',          shift:'>',       w:'1',    finger:'rr' },
      { code:'Slash',        label:'/',          shift:'?',       w:'1',    finger:'rp' },
      { code:'IntlRo',       label:'\\',         shift:'_',       w:'1',    finger:'rp' },
      { code:'ShiftRight',   label:'⇧',          shift:'',        w:'2.75', finger:'rp', special:true }
    ],
    /* Row 4 — Bottom row (JIS) */
    [
      { code:'ControlLeft',  label:'ctrl',       shift:'',        w:'1.25', finger:'lp', special:true },
      { code:'AltLeft',      label:'opt',        shift:'',        w:'1.25', finger:'lt', special:true },
      { code:'MetaLeft',     label:'⌘',          shift:'',        w:'1.25', finger:'lt', special:true },
      { code:'Lang2',        label:'英数',        shift:'',        w:'1',    finger:'lt', special:true },
      { code:'Space',        label:'',           shift:'',        w:'6',    finger:'rt', special:true },
      { code:'Lang1',        label:'かな',        shift:'',        w:'1',    finger:'rt', special:true },
      { code:'MetaRight',    label:'⌘',          shift:'',        w:'1.25', finger:'rt', special:true },
      { code:'AltRight',     label:'opt',        shift:'',        w:'1.25', finger:'rp', special:true },
      { code:'ArrowLeft',    label:'←',          shift:'',        w:'1',    finger:'rp', special:true },
      { code:'ArrowDown',    label:'↓',          shift:'',        w:'1',    finger:'rp', special:true },
      { code:'ArrowRight',   label:'→',          shift:'',        w:'1',    finger:'rp', special:true }
    ]
  ],

  /* --- Finger mapping: code → finger id --- */
  fingerMap: {
    /* Left Pinky */
    'Backquote':'lp','Digit1':'lp','Tab':'lp','KeyQ':'lp','CapsLock':'lp','KeyA':'lp',
    'ShiftLeft':'lp','KeyZ':'lp','ControlLeft':'lp',
    /* Left Ring */
    'Digit2':'lr','KeyW':'lr','KeyS':'lr','KeyX':'lr',
    /* Left Middle */
    'Digit3':'lm','KeyE':'lm','KeyD':'lm','KeyC':'lm',
    /* Left Index */
    'Digit4':'li','Digit5':'li','KeyR':'li','KeyT':'li','KeyF':'li','KeyG':'li',
    'KeyV':'li','KeyB':'li',
    /* Left Thumb */
    'AltLeft':'lt','MetaLeft':'lt','Lang2':'lt','Space':'lt',
    /* Right Thumb */
    'Lang1':'rt',
    /* Right Index */
    'Digit6':'ri','Digit7':'ri','KeyY':'ri','KeyU':'ri','KeyH':'ri','KeyJ':'ri',
    'KeyN':'ri','KeyM':'ri',
    /* Right Middle */
    'Digit8':'rm','KeyI':'rm','KeyK':'rm','Comma':'rm',
    /* Right Ring */
    'Digit9':'rr','KeyO':'rr','KeyL':'rr','Period':'rr',
    /* Right Pinky */
    'Digit0':'rp','Minus':'rp','Equal':'rp','IntlYen':'rp','Backspace':'rp',
    'BracketLeft':'rp','BracketRight':'rp','Enter':'rp',
    'Semicolon':'rp','Quote':'rp','Backslash':'rp',
    'Slash':'rp','IntlRo':'rp','ShiftRight':'rp',
    'MetaRight':'rt','AltRight':'rp','ArrowLeft':'rp','ArrowDown':'rp','ArrowRight':'rp'
  },

  /* --- Char → key code mapping (JIS) --- */
  charToCode(ch) {
    const map = {
      'a':'KeyA','b':'KeyB','c':'KeyC','d':'KeyD','e':'KeyE','f':'KeyF','g':'KeyG',
      'h':'KeyH','i':'KeyI','j':'KeyJ','k':'KeyK','l':'KeyL','m':'KeyM','n':'KeyN',
      'o':'KeyO','p':'KeyP','q':'KeyQ','r':'KeyR','s':'KeyS','t':'KeyT','u':'KeyU',
      'v':'KeyV','w':'KeyW','x':'KeyX','y':'KeyY','z':'KeyZ',
      'A':'KeyA','B':'KeyB','C':'KeyC','D':'KeyD','E':'KeyE','F':'KeyF','G':'KeyG',
      'H':'KeyH','I':'KeyI','J':'KeyJ','K':'KeyK','L':'KeyL','M':'KeyM','N':'KeyN',
      'O':'KeyO','P':'KeyP','Q':'KeyQ','R':'KeyR','S':'KeyS','T':'KeyT','U':'KeyU',
      'V':'KeyV','W':'KeyW','X':'KeyX','Y':'KeyY','Z':'KeyZ',
      '1':'Digit1','2':'Digit2','3':'Digit3','4':'Digit4','5':'Digit5',
      '6':'Digit6','7':'Digit7','8':'Digit8','9':'Digit9','0':'Digit0',
      '!':'Digit1','"':'Digit2','#':'Digit3','$':'Digit4','%':'Digit5',
      '&':'Digit6',"'":'Digit7','(':'Digit8',')':'Digit9',
      '-':'Minus','=':'Equal','^':'Equal','~':'Equal','¥':'IntlYen','|':'IntlYen',
      '@':'BracketLeft','`':'BracketLeft','[':'BracketRight','{':'BracketRight',
      ';':'Semicolon','+':'Semicolon',':':'Quote','*':'Quote',
      ']':'Backslash','}':'Backslash',
      ',':'Comma','<':'Comma','.':'Period','>':'Period',
      '/':'Slash','?':'Slash','\\':'IntlRo','_':'IntlRo',
      ' ':'Space','\n':'Enter','\t':'Tab'
    };
    return map[ch] || null;
  },

  /* Is this char typed with Shift held? */
  requiresShift(ch) {
    const shiftChars = '!"#$%&\'()'
      + '~^|`{<>?_}'
      + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      + '+*=';
    return shiftChars.includes(ch);
  }
};

/* ============================================================
   STATE
   ============================================================ */
const State = {
  mode: 'normal',
  lang: 'javascript',
  text: '',
  pos: 0,              // 正しく打てた文字数（カーソル位置）
  errors: 0,           // 間違えたキー入力の総数
  errorKeys: {},       // { char: count }
  wrongAtPos: false,   // 現在位置でミスタイプ中フラグ
  startTime: null,
  timerInterval: null,
  wpmInterval: null,
  running: false,
  finished: false
};

/* ============================================================
   DOM CACHE
   ============================================================ */
const $ = id => document.getElementById(id);

const DOM = {
  textDisplay:    $('text-display'),
  typingInput:    $('typing-input'),
  wpmValue:       $('wpm-value'),
  timerValue:     $('timer-value'),
  accValue:       $('acc-value'),
  modeGroup:      $('mode-group'),
  langGroup:      $('lang-group'),
  restartBtn:     $('restart-btn'),
  keyboardContainer: $('keyboard-container'),
  handsSvg:       $('hands-svg'),
  modalOverlay:   $('modal-overlay'),
  resultWpm:      $('result-wpm'),
  resultAcc:      $('result-acc'),
  resultTime:     $('result-time'),
  resultErrors:   $('result-errors'),
  weakKeysList:   $('weak-keys-list'),
  modalRestart:   $('modal-restart'),
  modalClose:     $('modal-close')
};

/* ============================================================
   KEYBOARD RENDERING
   ============================================================ */
const KeyboardRenderer = (() => {
  const W_UNIT = 46;
  const GAP    = 5;
  const wMap   = { '1': W_UNIT, '1.25': 63, '1.5': 74, '1.75': 85,
                   '2': 97, '2.25': 110, '2.75': 135, '3': 148,
                   '6': 250, '6.25': 275 };

  /* Build DOM elements */
  function render() {
    const container = DOM.keyboardContainer;
    container.innerHTML = '';

    Config.jisRows.forEach((rowDef, rowIdx) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'key-row';
      rowEl.dataset.row = rowIdx;

      rowDef.forEach(keyDef => {
        if (keyDef.code === 'Enter') {
          /* Reverse-L Enter: render as special element */
          const el = createEnterKey();
          rowEl.appendChild(el);
          return;
        }

        const el = createKey(keyDef);
        rowEl.appendChild(el);
      });

      container.appendChild(rowEl);
    });
  }

  function createKey(def) {
    const el = document.createElement('div');
    const fingerClass = 'finger-' + def.finger;
    el.className = `key ${fingerClass}`;
    el.id = 'key-' + def.code;
    el.dataset.code = def.code;
    el.dataset.finger = def.finger;

    /* Width */
    const w = wMap[def.w] || W_UNIT;
    el.style.width = w + 'px';

    /* Home row dot */
    if (def.home) el.classList.add('home-row');
    if (def.special) el.classList.add('modifier');

    /* Labels */
    if (def.shift && def.shift !== def.label) {
      const top = document.createElement('span');
      top.className = 'key-label top';
      top.textContent = def.shift;
      el.appendChild(top);

      const bot = document.createElement('span');
      bot.className = 'key-label bottom';
      bot.textContent = def.label;
      el.appendChild(bot);
    } else {
      const center = document.createElement('span');
      center.className = 'key-label center';
      center.textContent = def.label;
      el.appendChild(center);
    }

    return el;
  }

  function createEnterKey() {
    const el = document.createElement('div');
    el.className = 'key enter-jis finger-rp';
    el.id = 'key-Enter';
    el.dataset.code = 'Enter';
    el.dataset.finger = 'rp';

    const label = document.createElement('span');
    label.className = 'key-label center';
    label.textContent = 'Enter';
    el.appendChild(label);
    return el;
  }

  /* Highlight a key by code */
  function highlightKey(code, isShift) {
    clearHighlights();
    const el = document.getElementById('key-' + code);
    if (el) {
      el.classList.add('highlight');
      el.classList.add('finger-' + (el.dataset.finger || 'lp'));
    }
    if (isShift) {
      /* Determine which shift to highlight */
      const shiftCode = 'ShiftRight'; // default right shift for JIS
      const shiftEl = document.getElementById('key-' + shiftCode);
      if (shiftEl) {
        shiftEl.classList.add('highlight');
      }
    }
  }

  function clearHighlights() {
    document.querySelectorAll('.key.highlight').forEach(el => {
      el.classList.remove('highlight');
    });
  }

  function flashKey(code, type /* 'correct' | 'wrong' */) {
    const el = document.getElementById('key-' + code);
    if (!el) return;
    const cls = type === 'correct' ? 'correct-flash' : 'wrong-flash';
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 200);
  }

  function pressKey(code) {
    const el = document.getElementById('key-' + code);
    if (el) {
      el.classList.add('pressed');
      setTimeout(() => el.classList.remove('pressed'), 150);
    }
  }

  return { render, highlightKey, clearHighlights, flashKey, pressKey };
})();

/* ============================================================
   HAND ANIMATOR
   ============================================================ */
const HandAnimator = (() => {
  const fingerToSvgId = {
    lp: 'lf-pinky', lr: 'lf-ring', lm: 'lf-middle', li: 'lf-index',
    lt: 'lf-thumb', rt: 'rf-thumb',
    ri: 'rf-index', rm: 'rf-middle', rr: 'rf-ring', rp: 'rf-pinky'
  };

  function activateFinger(fingerId, isShift) {
    clearAll();
    const svgId = fingerToSvgId[fingerId];
    if (svgId) {
      const el = document.getElementById(svgId);
      if (el) el.classList.add('active');
    }
    if (isShift) {
      /* Also activate the shift pinky on the opposite side */
      const shiftFinger = fingerToSvgId['rp'];
      const shiftEl = document.getElementById(shiftFinger);
      if (shiftEl) shiftEl.classList.add('active');
    }
  }

  function clearAll() {
    document.querySelectorAll('.finger.active').forEach(el => {
      el.classList.remove('active');
    });
  }

  return { activateFinger, clearAll };
})();

/* ============================================================
   TEXT GENERATOR
   ============================================================ */
function generateText(mode, lang, length = 60) {
  const data = Config.words[lang] || Config.words.javascript;
  const pool = data[mode] || data.normal;

  if (mode === 'symbols') {
    /* For symbols mode, pick phrases/snippets */
    const shuffled = [...pool].sort(() => Math.random() - .5);
    let result = '';
    for (const snippet of shuffled) {
      if (result.length >= length) break;
      result += (result ? ' ' : '') + snippet;
    }
    return result.slice(0, Math.max(length, result.length));
  }

  /* Normal mode: random words */
  const words = [];
  while (words.join(' ').length < length) {
    words.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  return words.join(' ');
}

/* ============================================================
   TEXT DISPLAY
   ============================================================ */
function renderText(text, pos, errorSet) {
  DOM.textDisplay.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    const ch = text[i];
    span.textContent = ch === ' ' ? '\u00A0' : ch;

    if (i < pos) {
      span.classList.add(errorSet.has(i) ? 'wrong' : 'correct');
    } else if (i === pos) {
      /* ミスタイプ待機中は wrong-pending（赤カーソル）、正常時は active（橙カーソル） */
      span.classList.add(State.wrongAtPos ? 'wrong-pending' : 'active');
    }
    DOM.textDisplay.appendChild(span);
  }

  /* Progress bar update */
  updateProgress(pos / text.length);

  /* Update keyboard & hand highlights for next char */
  if (pos < text.length) {
    const nextChar = text[pos];
    const code = Config.charToCode(nextChar);
    const shift = Config.requiresShift(nextChar);
    if (code) {
      KeyboardRenderer.highlightKey(code, shift);
      const finger = Config.fingerMap[code] || 'rp';
      HandAnimator.activateFinger(finger, shift);
    } else {
      KeyboardRenderer.clearHighlights();
      HandAnimator.clearAll();
    }
  } else {
    KeyboardRenderer.clearHighlights();
    HandAnimator.clearAll();
  }
}

function updateProgress(ratio) {
  let bar = document.querySelector('.progress-bar-fill');
  if (!bar) return;
  bar.style.width = (ratio * 100) + '%';
}

/* ============================================================
   TIMER & WPM
   ============================================================ */
function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return String(m).padStart(2,'0') + ':' + String(s % 60).padStart(2,'0');
}

function calcWPM(chars, ms) {
  if (ms < 100) return 0;
  const words = chars / 5;
  const minutes = ms / 60000;
  return Math.round(words / minutes);
}

function calcAccuracy(correctChars, totalErrors) {
  const total = correctChars + totalErrors;
  if (total === 0) return 100;
  return Math.round((correctChars / total) * 100);
}

function startTimer() {
  State.startTime = Date.now();
  State.timerInterval = setInterval(() => {
    const elapsed = Date.now() - State.startTime;
    DOM.timerValue.textContent = formatTime(elapsed);
  }, 200);

  State.wpmInterval = setInterval(() => {
    const elapsed = Date.now() - State.startTime;
    const wpm = calcWPM(State.pos, elapsed);   // pos = 正解文字数
    DOM.wpmValue.textContent = wpm;
    const acc = calcAccuracy(State.pos, State.errors);
    DOM.accValue.textContent = acc + '%';
  }, 500);
}

function stopTimer() {
  clearInterval(State.timerInterval);
  clearInterval(State.wpmInterval);
}

/* ============================================================
   CORE TYPING LOGIC
   ============================================================ */
const errorSet = new Set();  // 間違えたまま通過した位置（現仕様では使わないが互換維持）

function shakeActiveChar() {
  const activeEl = DOM.textDisplay.querySelector('.char.active, .char.wrong-pending');
  if (!activeEl) return;
  activeEl.classList.remove('shake');
  /* reflow して再アニメーション */
  void activeEl.offsetWidth;
  activeEl.classList.add('shake');
}

function handleKeydown(e) {
  /* Allow browser shortcuts */
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'Shift') return;
  if (e.key === 'CapsLock') return;
  if (State.finished) return;

  e.preventDefault();

  /* Start timer on first keystroke */
  if (!State.running) {
    State.running = true;
    startTimer();
  }

  const text = State.text;
  const pos  = State.pos;

  if (pos >= text.length) return;

  const expected = text[pos];
  const typed    = e.key;

  /* Determine typed char */
  let typedChar = typed;
  if (typed === 'Enter') typedChar = '\n';
  else if (typed === 'Tab') typedChar = '\t';
  else if (typed.length !== 1) return; // ignore non-printable

  /* Visual feedback on physical key */
  const code = e.code;
  KeyboardRenderer.pressKey(code);

  if (typedChar === expected) {
    /* ✅ 正解 — カーソルを進める */
    State.wrongAtPos = false;
    State.pos++;
    KeyboardRenderer.flashKey(code, 'correct');
    renderText(text, State.pos, errorSet);
    if (State.pos >= text.length) finishSession();
  } else {
    /* ❌ ミス — カーソルを進めない。正しいキーを打つまでブロック */
    State.errors++;

    /* 同一位置での連続ミスも全カウント（苦手キー統計用） */
    const key = expected === ' ' ? 'Space' : expected;
    State.errorKeys[key] = (State.errorKeys[key] || 0) + 1;

    State.wrongAtPos = true;
    KeyboardRenderer.flashKey(code, 'wrong');
    shakeActiveChar();
    /* ← renderText は呼ばない（カーソル位置変わらないが wrong-pending 表示は維持） */
    renderText(text, State.pos, errorSet);
  }
}

/* ============================================================
   SESSION LIFECYCLE
   ============================================================ */
function initSession() {
  State.pos        = 0;
  State.errors     = 0;
  State.errorKeys  = {};
  State.wrongAtPos = false;
  State.running    = false;
  State.finished   = false;
  State.startTime  = null;
  errorSet.clear();

  stopTimer();

  DOM.wpmValue.textContent   = '—';
  DOM.timerValue.textContent = '00:00';
  DOM.accValue.textContent   = '—';

  State.text = generateText(State.mode, State.lang);
  renderText(State.text, 0, errorSet);

  /* Add progress bar if not exists */
  let track = document.querySelector('.progress-bar-track');
  if (!track) {
    track = document.createElement('div');
    track.className = 'progress-bar-track';
    const fill = document.createElement('div');
    fill.className = 'progress-bar-fill';
    track.appendChild(fill);
    DOM.textDisplay.parentElement.appendChild(track);
  }
  updateProgress(0);

  DOM.typingInput.focus();
}

function finishSession() {
  State.finished = true;
  State.running  = false;
  stopTimer();

  const elapsed = Date.now() - State.startTime;
  const wpm     = calcWPM(State.pos, elapsed);   // pos = 正解文字数
  const acc     = calcAccuracy(State.pos, State.errors);

  DOM.resultWpm.textContent    = wpm;
  DOM.resultAcc.textContent    = acc + '%';
  DOM.resultTime.textContent   = formatTime(elapsed);
  DOM.resultErrors.textContent = State.errors;

  /* Weak keys */
  DOM.weakKeysList.innerHTML = '';
  const sorted = Object.entries(State.errorKeys)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (sorted.length === 0) {
    DOM.weakKeysList.innerHTML = '<span style="color:#777;font-size:.8rem;">Perfect! No errors.</span>';
  } else {
    sorted.forEach(([key, count]) => {
      const chip = document.createElement('div');
      chip.className = 'weak-key-chip';
      chip.innerHTML = `<span>${key === ' ' ? '␣' : key}</span><span class="chip-count">${count}</span>`;
      DOM.weakKeysList.appendChild(chip);
    });
  }

  DOM.modalOverlay.classList.add('active');
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function setupEvents() {
  /* Focus management — click anywhere on typing box to focus */
  document.getElementById('typing-box').addEventListener('click', () => {
    DOM.typingInput.focus();
  });

  /* Keydown on the hidden input */
  DOM.typingInput.addEventListener('keydown', handleKeydown);

  /* Also catch keydown on body for convenience */
  document.addEventListener('keydown', e => {
    if (e.target !== DOM.typingInput) {
      DOM.typingInput.focus();
    }
  });

  /* Mode buttons */
  DOM.modeGroup.addEventListener('click', e => {
    const btn = e.target.closest('.mode-btn');
    if (!btn) return;
    DOM.modeGroup.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    State.mode = btn.dataset.mode;
    initSession();
  });

  /* Language buttons */
  DOM.langGroup.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    DOM.langGroup.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    State.lang = btn.dataset.lang;
    initSession();
  });

  /* Restart button */
  DOM.restartBtn.addEventListener('click', initSession);

  /* Modal buttons */
  DOM.modalRestart.addEventListener('click', () => {
    DOM.modalOverlay.classList.remove('active');
    initSession();
  });
  DOM.modalClose.addEventListener('click', () => {
    DOM.modalOverlay.classList.remove('active');
  });
  DOM.modalOverlay.addEventListener('click', e => {
    if (e.target === DOM.modalOverlay) {
      DOM.modalOverlay.classList.remove('active');
    }
  });
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  KeyboardRenderer.render();
  setupEvents();
  initSession();
});
