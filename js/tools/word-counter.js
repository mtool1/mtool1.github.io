(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="form-group">
      <label for="word-input">Enter your text below:</label>
      <textarea id="word-input" rows="10" placeholder="Paste or type your text here..."></textarea>
    </div>
    
    <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
      <div class="result-card text-center" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Words</div>
        <div id="word-count" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
      </div>
      <div class="result-card text-center" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Characters</div>
        <div id="char-count" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
      </div>
      <div class="result-card text-center" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Sentences</div>
        <div id="sentence-count" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
      </div>
      <div class="result-card text-center" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Paragraphs</div>
        <div id="para-count" style="font-size: 2rem; font-weight: 800; color: var(--primary);">0</div>
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <button id="clear-btn" class="btn btn-outline"><i class="fas fa-trash"></i> Clear</button>
      <button id="copy-btn" class="btn btn-primary"><i class="fas fa-copy"></i> Copy Text</button>
    </div>
  `;

  const input = document.getElementById('word-input');
  const wordCount = document.getElementById('word-count');
  const charCount = document.getElementById('char-count');
  const sentenceCount = document.getElementById('sentence-count');
  const paraCount = document.getElementById('para-count');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');

  function updateStats() {
    const text = input.value;
    
    charCount.textContent = text.length;
    wordCount.textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    sentenceCount.textContent = text.trim() === '' ? 0 : (text.match(/[.!?]+/g) || []).length;
    paraCount.textContent = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).length;
  }

  input.addEventListener('input', updateStats);

  clearBtn.addEventListener('click', () => {
    input.value = '';
    updateStats();
  });

  copyBtn.addEventListener('click', () => {
    input.select();
    document.execCommand('copy');
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
  });

})();
