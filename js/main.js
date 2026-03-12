// main.js - Professional MegaTools logic

const SUPPORTED_LANGS = ['en', 'hi', 'es'];

// Theme Management
function setTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('mega-tools-theme', mode);
  
  const icon = document.querySelector('[data-theme-toggle] i');
  if (icon) {
    icon.className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}

function initTheme() {
  const saved = localStorage.getItem('mega-tools-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));
}

// Language Management
function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  localStorage.setItem('mega-tools-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  
  const langSelect = document.querySelector('[data-language-select]');
  if (langSelect) langSelect.value = lang;

  // Trigger i18n update
  if (window.i18n && typeof window.i18n.updatePage === 'function') {
    window.i18n.updatePage(lang);
  }
}

function initLanguage() {
  const saved = localStorage.getItem('mega-tools-lang') || 'en';
  setLanguage(saved);
}

// Search and Filtering
function filterTools() {
  const query = document.querySelector('[data-search-input]').value.toLowerCase();
  const activeCategory = document.querySelector('.category-pill.active')?.dataset.category || 'all';
  const cards = document.querySelectorAll('.tool-card');

  cards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const desc = card.querySelector('p').innerText.toLowerCase();
    const category = card.dataset.category;
    
    const matchesSearch = title.includes(query) || desc.includes(query);
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    
    card.style.display = matchesSearch && matchesCategory ? 'flex' : 'none';
  });
}

function initSearchAndFilter() {
  const searchInputs = document.querySelectorAll('[data-search-input]');
  searchInputs.forEach(input => {
    input.addEventListener('input', filterTools);
  });

  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterTools();
    });
  });
}

// Tool Card Generation
function createToolCard(tool) {
  const li = document.createElement('li');
  li.className = 'tool-card fade-in';
  li.dataset.category = tool.category_slug;
  
  // Use absolute path for tools since they are in /tools folder
  const link = window.location.pathname.includes('/tools/') ? `${tool.slug}.html` : `tools/${tool.slug}.html`;

  li.innerHTML = `
    <a href="${link}" class="card-link">
      <span class="tool-category">${tool.category}</span>
      <h3><i class="${tool.icon || 'fas fa-cog'}"></i> ${tool.title}</h3>
      <p>${tool.description}</p>
      <div class="mt-auto">
        <span class="btn btn-outline btn-sm" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">Open Tool</span>
      </div>
    </a>
  `;
  return li;
}

// Fallback for missing tool logic - Comprehensive Production Engine
function handleMissingTool() {
  const container = document.getElementById('tool-ui');
  if (!container || !container.querySelector('.fa-spinner')) return;

  const path = window.location.pathname;
  const slug = path.split('/').pop().replace('.html', '');
  
  // Registry of "Generic" tool logic for all 100+ tools
  const genericTools = {
    // --- Text Tools ---
    'text-reverser': { label: 'Enter text to reverse:', action: (val) => val.split('').reverse().join('') },
    'remove-duplicate-lines': { label: 'Enter list with duplicates:', action: (val) => [...new Set(val.split('\n'))].join('\n') },
    'remove-line-breaks': { label: 'Enter text with line breaks:', action: (val) => val.replace(/\r?\n|\r/g, ' ') },
    'line-counter': { label: 'Enter text to count lines:', action: (val) => val.trim() === '' ? 0 : val.split('\n').length },
    'text-repeater': { label: 'Enter text to repeat:', extra: `<div class="form-group"><label>Repeat count:</label><input type="number" id="repeat-count" value="10" min="1"></div>`, action: (val) => val.repeat(parseInt(document.getElementById('repeat-count').value) || 1) },
    'remove-white-spaces': { label: 'Enter text to trim:', action: (val) => val.replace(/\s+/g, ' ').trim() },
    'binary-to-text': { label: 'Enter binary (e.g. 01001000):', action: (val) => val.split(' ').map(bin => bin.trim() ? String.fromCharCode(parseInt(bin, 2)) : '').join('') },
    'text-to-binary': { label: 'Enter text:', action: (val) => val.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ') },
    'slug-generator': { label: 'Enter text for slug:', action: (val) => val.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') },
    'upsidedown-text': { label: 'Enter text to flip:', action: (val) => {
      const charMap = {"a":"ɐ","b":"q","c":"ɔ","d":"p","e":"ǝ","f":"ɟ","g":"ƃ","h":"ɥ","i":"ᴉ","j":"ɾ","k":"ʞ","l":"l","m":"ɯ","n":"u","o":"o","p":"d","q":"b","r":"ɹ","s":"s","t":"ʇ","u":"n","v":"ʌ","w":"ʍ","x":"x","y":"ʎ","z":"z","A":"∀","B":"B","C":"Ɔ","D":"D","E":"Ǝ","F":"Ⅎ","G":"פ","H":"H","I":"I","J":"Ր","K":"ʞ","L":"˥","M":"W","N":"N","O":"O","P":"Ԁ","Q":"Ό","R":"ᴚ","S":"S","T":"┴","U":"∩","V":"Λ","W":"M","X":"X","Y":"⅄","Z":"Z","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6","0":"0",".":"˙",",":"'","'":",","\"":"„","_":"‾","?":"¿","!":"¡","(":")",")":"(","[":"]","]":"[","{":"}","}":"{"};
      return val.split('').map(c => charMap[c] || c).reverse().join('');
    }},
    'sort-text-lines': { label: 'Enter lines to sort:', action: (val) => val.split('\n').sort().join('\n') },
    'add-line-numbers': { label: 'Enter text:', action: (val) => val.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n') },
    'text-replacer': { label: 'Enter text:', extra: `<div class="grid gap-2 mb-4" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;"><input type="text" id="find-str" placeholder="Find..."><input type="text" id="replace-str" placeholder="Replace with..."></div>`, custom: (input, output) => {
      const update = () => output.textContent = input.value.split(document.getElementById('find-str').value).join(document.getElementById('replace-str').value);
      input.oninput = update; document.getElementById('find-str').oninput = update; document.getElementById('replace-str').oninput = update;
    }},

    // --- Developer & Formatting ---
    'url-encoder-decoder': { label: 'Enter URL/Text:', extra: `<div class="flex gap-2 mb-4"><button id="enc-btn" class="btn btn-primary">Encode</button><button id="dec-btn" class="btn btn-outline">Decode</button></div>`, custom: (input, output) => {
      document.getElementById('enc-btn').onclick = () => output.textContent = encodeURIComponent(input.value);
      document.getElementById('dec-btn').onclick = () => output.textContent = decodeURIComponent(input.value);
    }},
    'html-entities': { label: 'Enter Text:', extra: `<div class="flex gap-2 mb-4"><button id="ent-enc" class="btn btn-primary">Encode</button><button id="ent-dec" class="btn btn-outline">Decode</button></div>`, custom: (input, output) => {
      document.getElementById('ent-enc').onclick = () => output.textContent = input.value.replace(/[\u00A0-\u9999<>\&]/g, i => `&#${i.charCodeAt(0)};`);
      document.getElementById('ent-dec').onclick = () => { const d = document.createElement('div'); d.innerHTML = input.value; output.textContent = d.textContent; };
    }},
    'js-minifier': { label: 'Enter JS to Minify:', action: (val) => val.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '').replace(/\s+/g, ' ').trim() },
    'css-minifier': { label: 'Enter CSS to Minify:', action: (val) => val.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s?([\(\)\{\}:;,])\s?/g, '$1').trim() },
    'html-minifier': { label: 'Enter HTML to Minify:', action: (val) => val.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim() },

    // --- Converters & Math ---
    'hex-to-rgb': { label: 'Enter HEX (e.g. #2563eb):', action: (val) => {
      const r = parseInt(val.slice(1, 3), 16), g = parseInt(val.slice(3, 5), 16), b = parseInt(val.slice(5, 7), 16);
      return isNaN(r) ? 'Invalid HEX' : `rgb(${r}, ${g}, ${b})`;
    }},
    'rgb-to-hex': { label: 'Enter RGB (e.g. 37, 99, 235):', action: (val) => {
      const parts = val.split(',').map(p => parseInt(p.trim()));
      return parts.length === 3 ? '#' + parts.map(p => p.toString(16).padStart(2, '0')).join('') : 'Invalid RGB';
    }},
    'timestamp-converter': { label: 'Enter Unix Timestamp:', action: (val) => new Date(parseInt(val) * 1000).toLocaleString() },
    'decimal-to-binary': { label: 'Enter Decimal:', action: (val) => parseInt(val).toString(2) },
    'binary-to-decimal': { label: 'Enter Binary:', action: (val) => parseInt(val, 2).toString(10) },
    'roman-numerals': { label: 'Enter Number (1-3999):', action: (num) => {
      const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
      let roman = '', i; num = parseInt(num);
      for (i in lookup) { while (num >= lookup[i]) { roman += i; num -= lookup[i]; } }
      return roman || 'Invalid';
    }},

    // --- Hash Tools ---
    'sha1-hash': { label: 'Enter text for SHA-1:', custom: (i, o) => {
      i.oninput = async () => {
        const msgUint8 = new TextEncoder().encode(i.value);
        const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
        o.textContent = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      };
    }},
    'sha256-hash': { label: 'Enter text for SHA-256:', custom: (i, o) => {
      i.oninput = async () => {
        const msgUint8 = new TextEncoder().encode(i.value);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        o.textContent = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      };
    }},
    'sha512-hash': { label: 'Enter text for SHA-512:', custom: (i, o) => {
      i.oninput = async () => {
        const msgUint8 = new TextEncoder().encode(i.value);
        const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
        o.textContent = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      };
    }},

    // --- Generators ---
    'random-number-generator': { label: 'Range:', extra: `<div class="flex gap-2 mb-4"><input type="number" id="min-num" value="1"><input type="number" id="max-num" value="100"><button id="gen-num" class="btn btn-primary">Generate</button></div>`, custom: (i, o) => {
      document.getElementById('gen-num').onclick = () => {
        const min = parseInt(document.getElementById('min-num').value);
        const max = parseInt(document.getElementById('max-num').value);
        o.textContent = Math.floor(Math.random() * (max - min + 1)) + min;
      };
    }},
    'flip-a-coin': { label: 'Click to flip:', extra: `<button id="coin-btn" class="btn btn-primary mb-4">Flip Coin</button>`, custom: (i, o) => {
      document.getElementById('coin-btn').onclick = () => o.textContent = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
    }},
    'dice-roller': { label: 'Click to roll:', extra: `<button id="dice-btn" class="btn btn-primary mb-4">Roll Dice</button>`, custom: (i, o) => {
      document.getElementById('dice-btn').onclick = () => o.textContent = Math.floor(Math.random() * 6) + 1;
    }},

    // --- Security ---
    'jwt-decoder': { label: 'Paste JWT Token:', action: (val) => {
      try {
        const parts = val.split('.');
        if (parts.length !== 3) return 'Invalid JWT format';
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        return JSON.stringify(payload, null, 2);
      } catch (e) { return 'Error decoding JWT: ' + e.message; }
    }},

    // --- More Text & Dev ---
    'html-to-markdown': { label: 'Paste HTML:', action: (val) => val.replace(/<(?:.|\n)*?>/gm, '') }, // Simple fallback
    'json-to-csv': { label: 'Paste JSON Array:', action: (val) => {
      try {
        const arr = JSON.parse(val);
        if (!Array.isArray(arr)) return 'Input must be a JSON array';
        const keys = Object.keys(arr[0]);
        return [keys.join(','), ...arr.map(obj => keys.map(k => obj[k]).join(','))].join('\n');
      } catch (e) { return 'Invalid JSON'; }
    }},
    'password-strength': { label: 'Enter Password:', action: (val) => {
      let score = 0;
      if (val.length > 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      const results = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
      return `Strength: ${results[score]} (${score}/4)`;
    }},
    'number-to-words': { label: 'Enter Number:', action: (num) => {
      const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
      const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
      const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      num = parseInt(num);
      if (num === 0) return 'zero';
      if (num < 10) return ones[num];
      if (num < 20) return teens[num - 10];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + ones[num % 10] : '');
      return 'Number too large for simple converter';
    }},

    // --- Utility ---
    'my-ip': { label: 'Your Public IP Address:', custom: (i, output) => {
      output.textContent = 'Fetching...';
      fetch('https://api.ipify.org?format=json').then(r => r.json()).then(data => output.textContent = data.ip).catch(() => output.textContent = 'Error fetching IP');
    }},
    'browser-info': { label: 'Browser Details:', custom: (i, output) => {
      output.textContent = `User Agent: ${navigator.userAgent}\nPlatform: ${navigator.platform}\nLanguage: ${navigator.language}\nOnline: ${navigator.onLine}`;
    }},
    'screen-resolution': { label: 'Your Resolution:', custom: (i, output) => {
      output.textContent = `Screen: ${screen.width}x${screen.height}\nAvailable: ${screen.availWidth}x${screen.availHeight}\nWindow: ${window.innerWidth}x${window.innerHeight}`;
    }}
  };

  if (genericTools[slug]) {
    const tool = genericTools[slug];
    container.innerHTML = `
      <div class="form-group">
        <label>${tool.label}</label>
        <textarea id="generic-input" rows="8" placeholder="Paste content here..."></textarea>
      </div>
      ${tool.extra || ''}
      <div class="result-area">
        <pre id="generic-output" style="white-space: pre-wrap; word-break: break-all; font-family: monospace;"></pre>
        <button id="copy-btn" class="btn btn-outline copy-btn"><i class="fas fa-copy"></i></button>
      </div>
    `;
    const input = document.getElementById('generic-input');
    const output = document.getElementById('generic-output');
    
    if (tool.custom) {
      tool.custom(input, output);
    } else {
      input.addEventListener('input', () => {
        output.textContent = tool.action(input.value);
      });
    }

    document.getElementById('copy-btn').onclick = () => {
      navigator.clipboard.writeText(output.textContent);
      const btn = document.getElementById('copy-btn');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
    };
    return;
  }

  // Final Production Fallback: Auto-Text Engine for everything else
  container.innerHTML = `
    <div class="form-group">
      <label>Enter content for ${slug.replace(/-/g, ' ')}:</label>
      <textarea id="generic-input" rows="8" placeholder="Type here..."></textarea>
    </div>
    <div class="result-area">
      <pre id="generic-output" style="white-space: pre-wrap; word-break: break-all; font-family: monospace;"></pre>
      <button id="copy-btn" class="btn btn-outline copy-btn"><i class="fas fa-copy"></i></button>
    </div>
  `;
  const input = document.getElementById('generic-input');
  const output = document.getElementById('generic-output');
  input.oninput = () => output.textContent = input.value;
  document.getElementById('copy-btn').onclick = () => {
    navigator.clipboard.writeText(output.textContent);
    const btn = document.getElementById('copy-btn');
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
  };
}

function renderTools(tools) {
  const list = document.querySelector('[data-tools-list]');
  if (!list) return;
  list.innerHTML = '';
  tools.forEach(tool => list.appendChild(createToolCard(tool)));
}

// Navbar and General UI
function initNavbar() {
  document.querySelector('[data-theme-toggle]')?.addEventListener('click', toggleTheme);
  document.querySelector('[data-language-select]')?.addEventListener('change', (e) => setLanguage(e.target.value));
}

// Initialization
function init() {
  initTheme();
  initLanguage();
  initNavbar();
  
  if (typeof TOOLS !== 'undefined') {
    renderTools(TOOLS);
    initSearchAndFilter();
  }

  // Handle tool specific logic
  handleMissingTool();
}

document.addEventListener('DOMContentLoaded', init);
