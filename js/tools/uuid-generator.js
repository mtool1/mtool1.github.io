(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container text-center">
      <div class="result-area mb-4">
        <pre id="uuid-display" style="font-size: 1.5rem; min-height: 2.25rem;">Generating...</pre>
        <button id="copy-btn" class="btn btn-outline copy-btn"><i class="fas fa-copy"></i></button>
      </div>

      <div class="form-group" style="max-width: 200px; margin: 0 auto 1.5rem;">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" min="1" max="100" value="1">
      </div>

      <button id="generate-btn" class="btn btn-primary">
        <i class="fas fa-sync"></i> Generate New UUID(s)
      </button>
    </div>
  `;

  const display = document.getElementById('uuid-display');
  const quantityInput = document.getElementById('quantity');
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function refresh() {
    const qty = Math.max(1, Math.min(100, parseInt(quantityInput.value) || 1));
    const uuids = Array.from({ length: qty }, generateUUID);
    display.textContent = uuids.join('\n');
  }

  generateBtn.addEventListener('click', refresh);
  
  copyBtn.addEventListener('click', () => {
    const text = display.textContent;
    if (text) {
      navigator.clipboard.writeText(text);
      const originalIcon = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    }
  });

  // Initial generation
  refresh();

})();
