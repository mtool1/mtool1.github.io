(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="form-group">
      <label for="base64-input">Input Text / Base64:</label>
      <textarea id="base64-input" rows="8" placeholder="Paste your content here..."></textarea>
    </div>
    
    <div class="flex gap-2 mb-4">
      <button id="encode-btn" class="btn btn-primary"><i class="fas fa-lock"></i> Encode to Base64</button>
      <button id="decode-btn" class="btn btn-outline"><i class="fas fa-unlock"></i> Decode from Base64</button>
      <button id="clear-btn" class="btn btn-outline"><i class="fas fa-trash"></i> Clear</button>
    </div>

    <div id="error-msg" class="mb-4" style="color: var(--error); display: none; padding: 0.75rem; background: #fee2e2; border-radius: var(--radius); border: 1px solid #fecaca;">
      <i class="fas fa-exclamation-circle"></i> Invalid Base64 input
    </div>

    <div class="result-area">
      <pre id="base64-output" style="max-height: 500px; overflow: auto;"></pre>
      <button id="copy-btn" class="btn btn-outline copy-btn"><i class="fas fa-copy"></i></button>
    </div>
  `;

  const input = document.getElementById('base64-input');
  const output = document.getElementById('base64-output');
  const errorMsg = document.getElementById('error-msg');
  const encodeBtn = document.getElementById('encode-btn');
  const decodeBtn = document.getElementById('decode-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');

  function encode() {
    errorMsg.style.display = 'none';
    const value = input.value;
    if (!value) return;
    try {
      output.textContent = btoa(unescape(encodeURIComponent(value)));
    } catch (e) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Error encoding to Base64';
    }
  }

  function decode() {
    errorMsg.style.display = 'none';
    const value = input.value.trim();
    if (!value) return;
    try {
      output.textContent = decodeURIComponent(escape(atob(value)));
    } catch (e) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Invalid Base64 string';
      output.textContent = '';
    }
  }

  encodeBtn.addEventListener('click', encode);
  decodeBtn.addEventListener('click', decode);
  
  clearBtn.addEventListener('click', () => {
    input.value = '';
    output.textContent = '';
    errorMsg.style.display = 'none';
  });

  copyBtn.addEventListener('click', () => {
    const text = output.textContent;
    if (text) {
      navigator.clipboard.writeText(text);
      const originalIcon = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    }
  });

})();
