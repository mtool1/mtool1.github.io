// Navbar component functions
export function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `<div class="brand-wrap"><a href="index.html" class="brand">Mega Free Tools</a><span class="badge">Beta</span></div>`;
  return nav;
}
