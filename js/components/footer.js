// Footer component for reuse
export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} Mega Free Tools</p>`;
  return footer;
}
