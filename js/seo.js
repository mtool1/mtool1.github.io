// seo.js (expandable)

function addRichContent() {
  const main = document.querySelector('main');
  if (!main) return;
  const p = document.createElement('p');
  p.textContent = 'SEO optimized tool pages should include feature descriptions, use cases, and FAQ sections to capture search intent.';
  main.appendChild(p);
}

if (document.readyState !== 'loading') addRichContent(); else document.addEventListener('DOMContentLoaded', addRichContent);
