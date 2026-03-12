(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container text-center">
      <div class="form-group">
        <label for="color-picker-input">Select or Type Color:</label>
        <div class="flex gap-4 items-center justify-center">
          <input type="color" id="color-picker-input" value="#2563eb" style="width: 100px; height: 100px; padding: 0; border: none;">
          <input type="text" id="hex-input" value="#2563eb" style="width: 150px; font-family: monospace; font-size: 1.25rem;">
        </div>
      </div>
      
      <div class="grid mt-8" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div class="p-4 border rounded bg-white">
          <label class="block text-sm font-bold mb-2">RGB</label>
          <div id="rgb-val" class="font-mono">rgb(37, 99, 235)</div>
          <button class="btn btn-sm btn-outline mt-2 copy-btn" data-copy="rgb-val"><i class="fas fa-copy"></i></button>
        </div>
        <div class="p-4 border rounded bg-white">
          <label class="block text-sm font-bold mb-2">HSL</label>
          <div id="hsl-val" class="font-mono">hsl(221, 83%, 53%)</div>
          <button class="btn btn-sm btn-outline mt-2 copy-btn" data-copy="hsl-val"><i class="fas fa-copy"></i></button>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t">
        <label class="block font-bold mb-4">Color Palette</label>
        <div id="palette" class="flex gap-2 justify-center flex-wrap"></div>
      </div>
    </div>
  `;

  const colorInput = document.getElementById('color-picker-input');
  const hexInput = document.getElementById('hex-input');
  const rgbVal = document.getElementById('rgb-val');
  const hslVal = document.getElementById('hsl-val');
  const palette = document.getElementById('palette');

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) h = s = 0;
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function update(hex) {
    colorInput.value = hex;
    hexInput.value = hex;
    const { r, g, b } = hexToRgb(hex);
    rgbVal.textContent = `rgb(${r}, ${g}, ${b})`;
    const { h, s, l } = rgbToHsl(r, g, b);
    hslVal.textContent = `hsl(${h}, ${s}%, ${l}%)`;
    
    // Update Palette
    palette.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const div = document.createElement('div');
      const light = Math.max(10, Math.min(90, l + (i - 3) * 15));
      const color = `hsl(${h}, ${s}%, ${light}%)`;
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.backgroundColor = color;
      div.style.borderRadius = '8px';
      div.style.cursor = 'pointer';
      div.title = color;
      div.onclick = () => {
        // Simple HSL to HEX would be needed here for full interactivity
      };
      palette.appendChild(div);
    }
  }

  colorInput.addEventListener('input', (e) => update(e.target.value));
  hexInput.addEventListener('input', (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) update(e.target.value);
  });

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.copy;
      const text = document.getElementById(id).textContent;
      navigator.clipboard.writeText(text);
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => btn.innerHTML = original, 2000);
    };
  });

  update('#2563eb');

})();
