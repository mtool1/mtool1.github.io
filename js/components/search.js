// Search component for filtering tool cards
export function bindSearch(inputSelector, cardSelector) {
  const input = document.querySelector(inputSelector);
  if (!input) return;
  input.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll(cardSelector).forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
  });
}
