(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="form-group">
      <label for="json-input">Enter JSON:</label>
      <textarea id="json-input" rows="10" placeholder='{"name": "John", "age": 30, "city": "New York"}'></textarea>
    </div>
    
    <div class="flex gap-2 mb-4">
      <button id="format-btn" class="btn btn-primary"><i class="fas fa-indent"></i> Format (2 Spaces)</button>
      <button id="format-4-btn" class="btn btn-outline"><i class="fas fa-indent"></i> Format (4 Spaces)</button>
      <button id="minify-btn" class="btn btn-outline"><i class="fas fa-compress-arrows-alt"></i> Minify</button>
      <button id="clear-btn" class="btn btn-outline"><i class="fas fa-trash"></i> Clear</button>
    </div>

    <div id="error-msg" class="mb-4" style="color: var(--error); display: none; padding: 0.75rem; background: #fee2e2; border-radius: var(--radius); border: 1px solid #fecaca;">
      <i class="fas fa-exclamation-circle"></i> Invalid JSON
    </div>

    <div class="result-area">
      <pre id="json-output" style="max-height: 500px; overflow: auto;"></pre>
      <button id="copy-btn" class="btn btn-outline copy-btn"><i class="fas fa-copy"></i></button>
    </div>
  `;

  const input = document.getElementById('json-input');
  const output = document.getElementById('json-output');
  const errorMsg = document.getElementById('error-msg');
  const formatBtn = document.getElementById('format-btn');
  const format4Btn = document.getElementById('format-4-btn');
  const minifyBtn = document.getElementById('minify-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');

  function processJSON(indent) {
    errorMsg.style.display = 'none';
    const value = input.value.trim();
    if (!value) return;

    try {
      const obj = JSON.parse(value);
      output.textContent = indent === 0 ? JSON.stringify(obj) : JSON.stringify(obj, null, indent);
    } catch (e) {
      errorMsg.style.display = 'block';
      errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> Invalid JSON: ${e.message}`;
      output.textContent = '';
    }
  }

  formatBtn.addEventListener('click', () => processJSON(2));
  format4Btn.addEventListener('click', () => processJSON(4));
  minifyBtn.addEventListener('click', () => processJSON(0));
  
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
