// i18n.js - Robust translation system for MegaTools

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('mega-tools-lang') || 'en';
    this.translations = {};
    this.isLoaded = false;
  }

  async init() {
    await this.loadTranslations(this.currentLang);
    this.updatePage();
  }

  async loadTranslations(lang) {
    const paths = [
      `lang/${lang}.json`,
      `../lang/${lang}.json`,
      `../../lang/${lang}.json`
    ];

    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          this.translations = await response.json();
          this.currentLang = lang;
          this.isLoaded = true;
          return;
        }
      } catch (e) {
        // Continue to next path
      }
    }
    console.error(`Could not load translations for ${lang}`);
  }

  t(key) {
    return this.translations[key] || key;
  }

  updatePage() {
    if (!this.isLoaded) return;

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (this.translations[key]) {
        el.textContent = this.translations[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (this.translations[key]) {
        el.placeholder = this.translations[key];
      }
    });

    // Update tool cards if they exist (they are dynamic)
    this.updateDynamicContent();
  }

  updateDynamicContent() {
    // This can be called after tools are rendered
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
      // Logic to translate dynamic tool cards if needed
      // For now, tools are rendered from site-data.js which is English-only in this skeleton
    });
  }

  async setLanguage(lang) {
    await this.loadTranslations(lang);
    this.currentLang = lang;
    localStorage.setItem('mega-tools-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    this.updatePage();
  }
}

// Global instance
window.i18n = new I18n();

document.addEventListener('DOMContentLoaded', () => {
  window.i18n.init();
});
