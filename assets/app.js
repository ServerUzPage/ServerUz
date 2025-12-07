(async function init() {
  const sb = document.getElementById('sidebar');
  if (sb) {
    try {
      // Caminho relativo para funcionar no GitHub Pages
      const res = await fetch('./partials/sidebar.html');
      sb.innerHTML = await res.text();
    } catch (e) {
      sb.innerHTML = '<div style="padding:16px">Menu</div>';
    }
    setActive();
    bindMobile();
  }
  setupTheme();
})();

function setActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
}

function bindMobile() {
  const navBtn = document.getElementById('nav-btn');
  const sidebar = document.getElementById('sidebar');
  if (!navBtn || !sidebar) return;

  navBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

function setupTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}
