(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container">
      <div class="result-area mb-4">
        <pre id="password-display" style="font-size: 1.5rem; text-align: center; min-height: 2.25rem;">Click Generate</pre>
        <button id="copy-btn" class="btn btn-outline copy-btn"><i class="fas fa-copy"></i></button>
      </div>

      <div class="form-group">
        <label for="length-slider">Password Length: <span id="length-val">16</span></label>
        <input type="range" id="length-slider" min="4" max="64" value="16" style="width: 100%;">
      </div>

      <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="checkbox" id="include-uppercase" checked style="width: auto;">
          <label for="include-uppercase" style="margin-bottom: 0;">Uppercase (A-Z)</label>
        </div>
        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="checkbox" id="include-lowercase" checked style="width: auto;">
          <label for="include-lowercase" style="margin-bottom: 0;">Lowercase (a-z)</label>
        </div>
        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="checkbox" id="include-numbers" checked style="width: auto;">
          <label for="include-numbers" style="margin-bottom: 0;">Numbers (0-9)</label>
        </div>
        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="checkbox" id="include-symbols" checked style="width: auto;">
          <label for="include-symbols" style="margin-bottom: 0;">Symbols (!@#$%^&*)</label>
        </div>
      </div>

      <button id="generate-btn" class="btn btn-primary w-full mt-4" style="width: 100%;">
        <i class="fas fa-sync"></i> Generate Secure Password
      </button>
    </div>
  `;

  const display = document.getElementById('password-display');
  const lengthSlider = document.getElementById('length-slider');
  const lengthVal = document.getElementById('length-val');
  const upperCb = document.getElementById('include-uppercase');
  const lowerCb = document.getElementById('include-lowercase');
  const numberCb = document.getElementById('include-numbers');
  const symbolCb = document.getElementById('include-symbols');
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');

  const charset = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  };

  function generatePassword() {
    let characters = '';
    if (upperCb.checked) characters += charset.upper;
    if (lowerCb.checked) characters += charset.lower;
    if (numberCb.checked) characters += charset.number;
    if (symbolCb.checked) characters += charset.symbol;

    if (characters === '') {
      display.textContent = 'Select at least one option';
      return;
    }

    let password = '';
    const length = parseInt(lengthSlider.value);
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    display.textContent = password;
  }

  lengthSlider.addEventListener('input', () => {
    lengthVal.textContent = lengthSlider.value;
    generatePassword();
  });

  [upperCb, lowerCb, numberCb, symbolCb].forEach(cb => {
    cb.addEventListener('change', generatePassword);
  });

  generateBtn.addEventListener('click', generatePassword);

  copyBtn.addEventListener('click', () => {
    const password = display.textContent;
    if (password && password !== 'Click Generate' && password !== 'Select at least one option') {
      navigator.clipboard.writeText(password);
      const originalIcon = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    }
  });

  // Initial generation
  generatePassword();

})();
