(async function init(){
  const sb = document.getElementById('sidebar');
  if (sb){
    try {
      // REMOVIDO O "/" → caminho relativo
      const res = await fetch('partials/sidebar.html');
      sb.innerHTML = await res.text();
    } catch(e){
      sb.innerHTML = '<div style="padding:16px">Menu</div>';
    }
    setActive();
    bindMobile();
  }
  setupTheme();
})();

function setActive(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((href.endsWith('index.html') && (path===''||path==='index.html')) || href.endsWith(path)){
      a.classList.add('active');
    }
  });
}

function bindMobile(){
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', ()=> sidebar.classList.toggle('open'));
  sidebar.addEventListener('click', e=>{ if(e.target.tagName==='A') sidebar.classList.remove('open') });
}

// Theme
function setupTheme(){
  const saved = localStorage.getItem('serveruz-theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeToggle');
  if (btn){
    btn.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('serveruz-theme', next);
      btn.innerText = next === 'light' ? 'Escurecer' : 'Clarear';
    });
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.innerText = cur === 'light' ? 'Escurecer' : 'Clarear';
  }
}
