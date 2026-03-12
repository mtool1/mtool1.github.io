(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  const units = {
    length: {
      meters: 1,
      kilometers: 1000,
      centimeters: 0.01,
      millimeters: 0.001,
      miles: 1609.34,
      yards: 0.9144,
      feet: 0.3048,
      inches: 0.0254
    },
    weight: {
      kilograms: 1,
      grams: 0.001,
      milligrams: 0.000001,
      pounds: 0.453592,
      ounces: 0.0283495
    }
  };

  container.innerHTML = `
    <div class="tool-container">
      <div class="form-group">
        <label for="category-select">Category:</label>
        <select id="category-select">
          <option value="length">Length</option>
          <option value="weight">Weight / Mass</option>
        </select>
      </div>

      <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label for="from-value">From:</label>
          <input type="number" id="from-value" value="1">
          <select id="from-unit" class="mt-2"></select>
        </div>
        <div class="form-group">
          <label for="to-value">To:</label>
          <input type="number" id="to-value" readonly>
          <select id="to-unit" class="mt-2"></select>
        </div>
      </div>

      <div class="result-area mt-4 text-center">
        <div id="conversion-result" style="font-size: 1.5rem; font-weight: 700; color: var(--primary);"></div>
      </div>
    </div>
  `;

  const categorySelect = document.getElementById('category-select');
  const fromValue = document.getElementById('from-value');
  const toValue = document.getElementById('to-value');
  const fromUnit = document.getElementById('from-unit');
  const toUnit = document.getElementById('to-unit');
  const result = document.getElementById('conversion-result');

  function updateUnits() {
    const cat = categorySelect.value;
    const options = Object.keys(units[cat]).map(unit => `<option value="${unit}">${unit}</option>`).join('');
    fromUnit.innerHTML = options;
    toUnit.innerHTML = options;
    if (toUnit.options.length > 1) toUnit.selectedIndex = 1;
    convert();
  }

  function convert() {
    const cat = categorySelect.value;
    const val = parseFloat(fromValue.value) || 0;
    const from = fromUnit.value;
    const to = toUnit.value;

    const baseVal = val * units[cat][from];
    const finalVal = baseVal / units[cat][to];

    toValue.value = finalVal.toFixed(4).replace(/\.?0+$/, '');
    result.textContent = `${val} ${from} = ${toValue.value} ${to}`;
  }

  categorySelect.addEventListener('change', updateUnits);
  [fromValue, fromUnit, toUnit].forEach(el => el.addEventListener('input', convert));

  // Initial
  updateUnits();

})();
