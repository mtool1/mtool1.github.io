(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container text-center">
      <div class="result-area mb-8">
        <div id="name-display" style="font-size: 2.5rem; font-weight: 800; color: var(--primary); min-height: 3.5rem;">Click Generate</div>
      </div>

      <div class="grid mb-8" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: left;">
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select id="gender">
            <option value="both">Both</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="qty">Quantity:</label>
          <input type="number" id="qty" value="1" min="1" max="50">
        </div>
      </div>

      <button id="gen-btn" class="btn btn-primary w-full" style="width: 100%;">
        <i class="fas fa-sync"></i> Generate Random Name(s)
      </button>
    </div>
  `;

  const maleNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'];
  const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

  const display = document.getElementById('name-display');
  const genderSelect = document.getElementById('gender');
  const qtyInput = document.getElementById('qty');
  const genBtn = document.getElementById('gen-btn');

  function generate() {
    const qty = Math.min(50, parseInt(qtyInput.value) || 1);
    const gender = genderSelect.value;
    let results = [];

    for (let i = 0; i < qty; i++) {
      let first = '';
      if (gender === 'male') first = maleNames[Math.floor(Math.random() * maleNames.length)];
      else if (gender === 'female') first = femaleNames[Math.floor(Math.random() * femaleNames.length)];
      else first = Math.random() > 0.5 ? maleNames[Math.floor(Math.random() * maleNames.length)] : femaleNames[Math.floor(Math.random() * femaleNames.length)];
      
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      results.push(`${first} ${last}`);
    }

    display.innerHTML = results.join('<br>');
    display.style.fontSize = qty > 5 ? '1.25rem' : '2.5rem';
  }

  genBtn.addEventListener('click', generate);

})();
