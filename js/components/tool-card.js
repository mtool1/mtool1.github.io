// Utility for rendering tool cards
export function renderToolCard(tool) {
  const li = document.createElement('li');
  li.className = 'tool-card';
  li.innerHTML = `<a class="card-link" href="tools/${tool.slug}.html"><h3>${tool.title}</h3><p>${tool.description}</p><span>${tool.category}</span></a>`;
  return li;
}
