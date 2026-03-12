(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container text-center">
      <div class="form-group mb-8">
        <div id="drop-zone" style="border: 2px dashed var(--border); padding: 3rem; border-radius: var(--radius-lg); cursor: pointer; transition: all 0.2s ease;">
          <i class="fas fa-expand-arrows-alt fa-3x text-primary mb-4"></i>
          <p>Drag & drop image or click to browse</p>
          <input type="file" id="image-input" accept="image/*" style="display: none;">
        </div>
      </div>

      <div id="resize-options" style="display: none;">
        <div class="grid mb-4" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label for="width">Width (px):</label>
            <input type="number" id="width" placeholder="Width">
          </div>
          <div class="form-group">
            <label for="height">Height (px):</label>
            <input type="number" id="height" placeholder="Height">
          </div>
        </div>

        <div class="form-group mb-4" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center;">
          <input type="checkbox" id="maintain-aspect" checked style="width: auto;">
          <label for="maintain-aspect" style="margin-bottom: 0;">Maintain Aspect Ratio</label>
        </div>
        
        <div id="preview-container" class="mb-4">
          <p class="font-bold mb-2">Preview</p>
          <div id="image-info" class="text-muted text-sm mb-2"></div>
          <canvas id="preview-canvas" style="max-width: 100%; border-radius: var(--radius); border: 1px solid var(--border);"></canvas>
        </div>

        <button id="download-btn" class="btn btn-primary w-full" style="width: 100%;">
          <i class="fas fa-download"></i> Download Resized Image
        </button>
      </div>
    </div>
  `;

  const dropZone = document.getElementById('drop-zone');
  const imageInput = document.getElementById('image-input');
  const options = document.getElementById('resize-options');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');
  const maintainAspect = document.getElementById('maintain-aspect');
  const canvas = document.getElementById('preview-canvas');
  const imageInfo = document.getElementById('image-info');
  const downloadBtn = document.getElementById('download-btn');

  let originalImg = null;
  let aspectRatio = 1;

  function handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImg = new Image();
      originalImg.onload = () => {
        aspectRatio = originalImg.width / originalImg.height;
        widthInput.value = originalImg.width;
        heightInput.value = originalImg.height;
        imageInfo.textContent = `Original: ${originalImg.width}x${originalImg.height}`;
        options.style.display = 'block';
        updatePreview();
      };
      originalImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function updatePreview() {
    if (!originalImg) return;
    const w = parseInt(widthInput.value) || originalImg.width;
    const h = parseInt(heightInput.value) || originalImg.height;
    
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImg, 0, 0, w, h);
  }

  widthInput.addEventListener('input', () => {
    if (maintainAspect.checked && originalImg) {
      heightInput.value = Math.round(widthInput.value / aspectRatio);
    }
    updatePreview();
  });

  heightInput.addEventListener('input', () => {
    if (maintainAspect.checked && originalImg) {
      widthInput.value = Math.round(heightInput.value * aspectRatio);
    }
    updatePreview();
  });

  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'resized-image.png';
    link.href = canvas.toDataURL();
    link.click();
  });

  dropZone.addEventListener('click', () => imageInput.click());
  imageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
  });

})();
