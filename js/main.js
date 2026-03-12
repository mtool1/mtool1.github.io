// main.js - Professional MegaTools logic

const SUPPORTED_LANGS = ['en', 'hi', 'es'];

// Theme Management
function setTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('mega-tools-theme', mode);
  
  const icon = document.querySelector('[data-theme-toggle] i');
  if (icon) {
    icon.className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}

function initTheme() {
  const saved = localStorage.getItem('mega-tools-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));
}

// Language Management
function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  localStorage.setItem('mega-tools-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  
  const langSelect = document.querySelector('[data-language-select]');
  if (langSelect) langSelect.value = lang;

  // Trigger i18n update
  if (window.i18n && typeof window.i18n.updatePage === 'function') {
    window.i18n.updatePage(lang);
  }
}

function initLanguage() {
  const saved = localStorage.getItem('mega-tools-lang') || 'en';
  setLanguage(saved);
}

// Search and Filtering
function filterTools() {
  const query = document.querySelector('[data-search-input]').value.toLowerCase();
  const activeCategory = document.querySelector('.category-pill.active')?.dataset.category || 'all';
  const cards = document.querySelectorAll('.tool-card');

  cards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const desc = card.querySelector('p').innerText.toLowerCase();
    const category = card.dataset.category;
    
    const matchesSearch = title.includes(query) || desc.includes(query);
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    
    card.style.display = matchesSearch && matchesCategory ? 'flex' : 'none';
  });
}

function initSearchAndFilter() {
  const searchInputs = document.querySelectorAll('[data-search-input]');
  searchInputs.forEach(input => {
    input.addEventListener('input', filterTools);
  });

  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterTools();
    });
  });
}

// Tool Card Generation
function createToolCard(tool) {
  const li = document.createElement('li');
  li.className = 'tool-card fade-in';
  li.dataset.category = tool.category_slug;
  li.innerHTML = `
    <a href="tools/${tool.slug}.html" class="card-link">
      <span class="tool-category">${tool.category}</span>
      <h3><i class="${tool.icon || 'fas fa-cog'}"></i> ${tool.title}</h3>
      <p>${tool.description}</p>
      <div class="mt-auto">
        <span class="btn btn-outline btn-sm" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">Open Tool</span>
      </div>
    </a>
  `;
  return li;
}

function renderTools(tools) {
  const list = document.querySelector('[data-tools-list]');
  if (!list) return;
  list.innerHTML = '';
  tools.forEach(tool => list.appendChild(createToolCard(tool)));
}

// Navbar and General UI
function initNavbar() {
  document.querySelector('[data-theme-toggle]')?.addEventListener('click', toggleTheme);
  document.querySelector('[data-language-select]')?.addEventListener('change', (e) => setLanguage(e.target.value));
}

// Initialization
function init() {
  initTheme();
  initLanguage();
  initNavbar();
  
  if (typeof TOOLS !== 'undefined') {
    renderTools(TOOLS);
    initSearchAndFilter();
  }
}

document.addEventListener('DOMContentLoaded', init);
