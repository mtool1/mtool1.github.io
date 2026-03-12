(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container">
      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob">
      </div>
      <div class="form-group">
        <label for="target-date">Age at the Date of:</label>
        <input type="date" id="target-date">
      </div>
      
      <button id="calculate-btn" class="btn btn-primary w-full" style="width: 100%;">
        <i class="fas fa-calculator"></i> Calculate Age
      </button>

      <div id="result-display" class="mt-8 text-center" style="display: none;">
        <div style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 0.5rem;">Your Age is</div>
        <div id="age-result" style="font-size: 2.5rem; font-weight: 800; color: var(--primary);"></div>
        <div id="age-details" class="mt-4 text-muted" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem;"></div>
      </div>
    </div>
  `;

  const dobInput = document.getElementById('dob');
  const targetInput = document.getElementById('target-date');
  const calculateBtn = document.getElementById('calculate-btn');
  const resultDisplay = document.getElementById('result-display');
  const ageResult = document.getElementById('age-result');
  const ageDetails = document.getElementById('age-details');

  // Set default target date to today
  targetInput.valueAsDate = new Date();

  function calculateAge() {
    const dob = dobInput.valueAsDate;
    const target = targetInput.valueAsDate;

    if (!dob || !target) return;

    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    resultDisplay.style.display = 'block';
    ageResult.textContent = `${years} Years, ${months} Months, ${days} Days`;

    const totalDays = Math.floor((target - dob) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    ageDetails.innerHTML = `
      <div class="result-card" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Months</div>
        <div style="font-size: 1.25rem; font-weight: 700;">${years * 12 + months}</div>
      </div>
      <div class="result-card" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Weeks</div>
        <div style="font-size: 1.25rem; font-weight: 700;">${totalWeeks.toLocaleString()}</div>
      </div>
      <div class="result-card" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Days</div>
        <div style="font-size: 1.25rem; font-weight: 700;">${totalDays.toLocaleString()}</div>
      </div>
      <div class="result-card" style="padding: 1rem; background: var(--surface-2); border-radius: var(--radius);">
        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Hours</div>
        <div style="font-size: 1.25rem; font-weight: 700;">${totalHours.toLocaleString()}</div>
      </div>
    `;
  }

  calculateBtn.addEventListener('click', calculateAge);

})();
