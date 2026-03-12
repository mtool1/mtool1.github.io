(function() {
  const container = document.getElementById('tool-ui');
  if (!container) return;

  container.innerHTML = `
    <div class="form-group">
      <label for="qr-input">Enter Text or URL for QR Code:</label>
      <input type="text" id="qr-input" placeholder="https://mtool1.github.io">
    </div>
    
    <div class="text-center mt-8">
      <div id="qr-code-display" class="mb-6" style="background: white; padding: 1rem; display: inline-block; border-radius: var(--radius);">
        <i class="fas fa-qrcode fa-5x text-muted"></i>
      </div>
      <div>
        <button id="download-btn" class="btn btn-primary" disabled>
          <i class="fas fa-download"></i> Download QR Code
        </button>
      </div>
    </div>
  `;

  // Dynamically load the library
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  script.onload = () => {
    const input = document.getElementById('qr-input');
    const display = document.getElementById('qr-code-display');
    const downloadBtn = document.getElementById('download-btn');
    
    const qrcode = new QRCode(display, {
      width: 256,
      height: 256
    });

    function generate() {
      const val = input.value.trim();
      if (val) {
        qrcode.clear();
        qrcode.makeCode(val);
        downloadBtn.disabled = false;
      }
    }

    input.addEventListener('input', generate);
    
    downloadBtn.onclick = () => {
      const img = display.querySelector('img');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = img.src;
      link.click();
    };

    // Initial
    input.value = window.location.origin;
    generate();
  };
  document.head.appendChild(script);

})();
