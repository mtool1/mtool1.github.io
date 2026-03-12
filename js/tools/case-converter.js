(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="form-group">
      <label for="case-input">Enter your text:</label>
      <textarea id="case-input" rows="8" placeholder="Type or paste your text here..."></textarea>
    </div>
    
    <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
      <button id="upper-btn" class="btn btn-outline">UPPER CASE</button>
      <button id="lower-btn" class="btn btn-outline">lower case</button>
      <button id="title-btn" class="btn btn-outline">Title Case</button>
      <button id="sentence-btn" class="btn btn-outline">Sentence case</button>
      <button id="inverse-btn" class="btn btn-outline">iNVERSE cASE</button>
      <button id="capitalized-btn" class="btn btn-outline">Capitalized Case</button>
    </div>

    <div class="mt-4 flex gap-2">
      <button id="clear-btn" class="btn btn-outline"><i class="fas fa-trash"></i> Clear</button>
      <button id="copy-btn" class="btn btn-primary"><i class="fas fa-copy"></i> Copy to Clipboard</button>
    </div>
  `;

  const input = document.getElementById('case-input');
  const upperBtn = document.getElementById('upper-btn');
  const lowerBtn = document.getElementById('lower-btn');
  const titleBtn = document.getElementById('title-btn');
  const sentenceBtn = document.getElementById('sentence-btn');
  const inverseBtn = document.getElementById('inverse-btn');
  const capitalizedBtn = document.getElementById('capitalized-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');

  function updateText(newText) {
    input.value = newText;
  }

  upperBtn.addEventListener('click', () => updateText(input.value.toUpperCase()));
  lowerBtn.addEventListener('click', () => updateText(input.value.toLowerCase()));

  titleBtn.addEventListener('click', () => {
    updateText(input.value.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
  });

  sentenceBtn.addEventListener('click', () => {
    let text = input.value.toLowerCase();
    updateText(text.charAt(0).toUpperCase() + text.slice(1));
  });

  inverseBtn.addEventListener('click', () => {
    let text = input.value;
    let newText = '';
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);
      if (char === char.toUpperCase()) newText += char.toLowerCase();
      else newText += char.toUpperCase();
    }
    updateText(newText);
  });

  capitalizedBtn.addEventListener('click', () => {
    updateText(input.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()));
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
  });

  copyBtn.addEventListener('click', () => {
    input.select();
    document.execCommand('copy');
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => copyBtn.innerHTML = originalText, 2000);
  });

})();
