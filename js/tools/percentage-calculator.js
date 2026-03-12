(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container">
      <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label for="num-1">What is:</label>
          <input type="number" id="num-1" value="10">
        </div>
        <div class="form-group">
          <label for="num-2">% of:</label>
          <input type="number" id="num-2" value="100">
        </div>
      </div>
      
      <div class="result-area mb-8 text-center">
        <div id="res-1" style="font-size: 2rem; font-weight: 800; color: var(--primary);">10</div>
      </div>

      <div class="grid mt-8 pt-8 border-t" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label for="num-3">Percentage Change:</label>
          <div class="flex gap-2 items-center">
            <input type="number" id="num-3" value="50">
            <span>to</span>
            <input type="number" id="num-4" value="75">
          </div>
        </div>
      </div>
      
      <div class="result-area text-center">
        <div id="res-2" style="font-size: 2rem; font-weight: 800; color: var(--success);">+50%</div>
      </div>
    </div>
  `;

  const n1 = document.getElementById('num-1');
  const n2 = document.getElementById('num-2');
  const r1 = document.getElementById('res-1');
  
  const n3 = document.getElementById('num-3');
  const n4 = document.getElementById('num-4');
  const r2 = document.getElementById('res-2');

  function calc1() {
    const val = (parseFloat(n1.value) / 100) * parseFloat(n2.value);
    r1.textContent = isNaN(val) ? '0' : val.toFixed(2).replace(/\.00$/, '');
  }

  function calc2() {
    const v1 = parseFloat(n3.value);
    const v2 = parseFloat(n4.value);
    const diff = ((v2 - v1) / Math.abs(v1)) * 100;
    if (isNaN(diff)) {
      r2.textContent = '0%';
    } else {
      const sign = diff >= 0 ? '+' : '';
      r2.textContent = sign + diff.toFixed(2).replace(/\.00$/, '') + '%';
      r2.style.color = diff >= 0 ? 'var(--success)' : 'var(--error)';
    }
  }

  [n1, n2].forEach(el => el.addEventListener('input', calc1));
  [n3, n4].forEach(el => el.addEventListener('input', calc2));

})();
