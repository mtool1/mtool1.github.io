(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container">
      <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div class="form-group">
          <label for="weight">Weight (kg):</label>
          <input type="number" id="weight" value="70" step="0.1">
        </div>
        <div class="form-group">
          <label for="height">Height (cm):</label>
          <input type="number" id="height" value="175">
        </div>
      </div>

      <button id="calc-btn" class="btn btn-primary w-full" style="width: 100%;">Calculate BMI</button>

      <div id="bmi-result-box" class="mt-8 text-center p-6 rounded-lg" style="display: none; background: var(--surface-2);">
        <div class="text-sm uppercase font-bold text-muted mb-2">Your BMI is</div>
        <div id="bmi-val" style="font-size: 3rem; font-weight: 800; color: var(--primary);">22.9</div>
        <div id="bmi-category" class="font-bold mt-2" style="font-size: 1.25rem;">Normal Weight</div>
        
        <div class="mt-6" style="height: 10px; background: #eee; border-radius: 5px; position: relative; overflow: hidden; display: flex;">
          <div style="width: 18.5%; background: #3b82f6;" title="Underweight"></div>
          <div style="width: 6.5%; background: #22c55e;" title="Normal"></div>
          <div style="width: 5%; background: #eab308;" title="Overweight"></div>
          <div style="width: 70%; background: #ef4444;" title="Obese"></div>
        </div>
        <div class="flex justify-between text-xs mt-2 text-muted">
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
        </div>
      </div>
    </div>
  `;

  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const calcBtn = document.getElementById('calc-btn');
  const resultBox = document.getElementById('bmi-result-box');
  const bmiVal = document.getElementById('bmi-val');
  const bmiCat = document.getElementById('bmi-category');

  function calculate() {
    const w = parseFloat(weightInput.value);
    const h = parseFloat(heightInput.value) / 100;
    
    if (w > 0 && h > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      bmiVal.textContent = bmi;
      resultBox.style.display = 'block';

      let cat = '';
      let color = '';
      if (bmi < 18.5) { cat = 'Underweight'; color = '#3b82f6'; }
      else if (bmi < 25) { cat = 'Normal Weight'; color = '#22c55e'; }
      else if (bmi < 30) { cat = 'Overweight'; color = '#eab308'; }
      else { cat = 'Obese'; color = '#ef4444'; }
      
      bmiCat.textContent = cat;
      bmiCat.style.color = color;
    }
  }

  calcBtn.addEventListener('click', calculate);

})();
