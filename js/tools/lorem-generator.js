(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container">
      <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" min="1" max="50" value="3">
        </div>
        <div class="form-group">
          <label for="type">Type:</label>
          <select id="type">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
      </div>

      <button id="generate-btn" class="btn btn-primary w-full" style="width: 100%;">
        <i class="fas fa-sync"></i> Generate Lorem Ipsum
      </button>

      <div class="result-area mt-8">
        <div id="lorem-output" style="max-height: 400px; overflow: auto; line-height: 1.6;"></div>
        <button id="copy-btn" class="btn btn-outline copy-btn"><i class="fas fa-copy"></i></button>
      </div>
    </div>
  `;

  const quantityInput = document.getElementById('quantity');
  const typeSelect = document.getElementById('type');
  const generateBtn = document.getElementById('generate-btn');
  const output = document.getElementById('lorem-output');
  const copyBtn = document.getElementById('copy-btn');

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const sentences = lorem.split('. ');

  function generate() {
    const qty = parseInt(quantityInput.value) || 1;
    const type = typeSelect.value;
    let result = '';

    if (type === 'paragraphs') {
      result = Array.from({ length: qty }, () => `<p class="mb-4">${lorem}</p>`).join('');
    } else if (type === 'sentences') {
      result = Array.from({ length: qty }, () => sentences[Math.floor(Math.random() * sentences.length)] + '. ').join('');
    } else {
      const words = lorem.split(' ');
      result = Array.from({ length: qty }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    }

    output.innerHTML = result;
  }

  generateBtn.addEventListener('click', generate);
  
  copyBtn.addEventListener('click', () => {
    const text = output.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      const originalIcon = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    }
  });

  // Initial
  generate();

})();
