(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="tool-container text-center">
      <div class="form-group mb-8">
        <div id="drop-zone" style="border: 2px dashed var(--border); padding: 3rem; border-radius: var(--radius-lg); cursor: pointer; transition: all 0.2s ease;">
          <i class="fas fa-cloud-upload-alt fa-3x text-primary mb-4"></i>
          <p>Drag & drop image or click to browse</p>
          <input type="file" id="image-input" accept="image/*" style="display: none;">
        </div>
      </div>

      <div id="compress-options" style="display: none;">
        <div class="form-group mb-4">
          <label for="quality">Compression Quality: <span id="quality-val">80</span>%</label>
          <input type="range" id="quality" min="1" max="100" value="80" style="width: 100%;">
        </div>
        
        <div id="preview-container" class="grid mb-4" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <p class="font-bold mb-2">Original</p>
            <div id="original-info" class="text-muted text-sm mb-2"></div>
            <img id="original-preview" style="max-width: 100%; border-radius: var(--radius);">
          </div>
          <div>
            <p class="font-bold mb-2">Compressed</p>
            <div id="compressed-info" class="text-muted text-sm mb-2"></div>
            <img id="compressed-preview" style="max-width: 100%; border-radius: var(--radius);">
          </div>
        </div>

        <button id="download-btn" class="btn btn-primary w-full" style="width: 100%;">
          <i class="fas fa-download"></i> Download Compressed Image
        </button>
      </div>
    </div>
  `;

  const dropZone = document.getElementById('drop-zone');
  const imageInput = document.getElementById('image-input');
  const options = document.getElementById('compress-options');
  const qualitySlider = document.getElementById('quality');
  const qualityVal = document.getElementById('quality-val');
  const originalPreview = document.getElementById('original-preview');
  const compressedPreview = document.getElementById('compressed-preview');
  const originalInfo = document.getElementById('original-info');
  const compressedInfo = document.getElementById('compressed-info');
  const downloadBtn = document.getElementById('download-btn');

  let originalFile = null;

  function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function compressImage() {
    if (!originalFile) return;

    const quality = parseInt(qualitySlider.value) / 100;
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          compressedPreview.src = url;
          compressedInfo.textContent = `Size: ${formatSize(blob.size)}`;
          
          downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `compressed_${originalFile.name}`;
            a.click();
          };
        }, originalFile.type, quality);
      };
      img.src = e.target.result;
      originalPreview.src = e.target.result;
    };
    reader.readAsDataURL(originalFile);
  }

  dropZone.addEventListener('click', () => imageInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--primary)';
    dropZone.style.backgroundColor = 'var(--primary-soft)';
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'var(--border)';
    dropZone.style.backgroundColor = 'transparent';
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  });

  imageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
  });

  function handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    originalFile = file;
    originalInfo.textContent = `Size: ${formatSize(file.size)}`;
    options.style.display = 'block';
    compressImage();
  }

  qualitySlider.addEventListener('input', () => {
    qualityVal.textContent = qualitySlider.value;
    compressImage();
  });

})();
