// Language switcher with localStorage
const locales = ['en', 'hi', 'es'];
export function setupLanguageSwitcher(selectSelector) {
  const select = document.querySelector(selectSelector);
  if (!select) return;
  select.innerHTML = locales.map(l => `<option value="${l}">${l.toUpperCase()}</option>`).join('');
  const saved = localStorage.getItem('mega-tools-lang') || 'en';
  select.value = saved;
  select.addEventListener('change', (e) => {
    localStorage.setItem('mega-tools-lang', e.target.value);
    location.reload();
  });
}
