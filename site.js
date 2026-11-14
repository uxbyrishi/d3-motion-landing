(function () {
  var root = document.documentElement;
  var KEY = 'theme';

  function stored() {
    try { var v = localStorage.getItem(KEY); return v === 'dark' || v === 'light' ? v : null; } catch (e) { return null; }
  }
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      var next = theme === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('title', 'Switch to ' + next + ' theme');
    }
    // Broadcast theme to resource animation iframes
    var iframes = document.querySelectorAll('.resource-iframe');
    for (var i = 0; i < iframes.length; i++) {
      try {
        if (iframes[i].contentWindow) {
          iframes[i].contentWindow.postMessage({ type: 'theme', theme: theme }, '*');
        }
        if (iframes[i].contentDocument) {
          iframes[i].contentDocument.documentElement.style.colorScheme = theme;
        }
      } catch(e) {}
    }
  }

  // Vercel Web Analytics Initialization
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  if (window.location.protocol !== 'file:' && window.location.hostname && !document.querySelector('script[src*="/_vercel/insights/script.js"]')) {
    var vaScript = document.createElement('script');
    vaScript.defer = true;
    vaScript.src = '/_vercel/insights/script.js';
    document.head.appendChild(vaScript);
  }

  // Default to dark theme unless user explicitly chose otherwise in localStorage
  apply(stored() || 'dark');

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  // Keep dark theme default unless visitor explicitly toggles
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () { if (stored()) apply(stored()); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }

  // Mobile menu
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(!header.classList.contains('nav-open')); });
  }

  // Tutorials dropdown: click/tap (hover and focus still work on desktop)
  var dd = document.querySelector('.nav-dropdown');
  var ddBtn = dd && dd.querySelector('.nav-dropdown-btn');
  function setDropdown(open) {
    if (!dd) return;
    dd.classList.toggle('open', open);
    ddBtn.setAttribute('aria-expanded', String(open));
  }
  if (ddBtn) {
    ddBtn.setAttribute('aria-expanded', 'false');
    ddBtn.addEventListener('click', function (e) { e.stopPropagation(); setDropdown(!dd.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) setDropdown(false); });
  }

  // Close menus on navigation, Escape or when growing to desktop width
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); setDropdown(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); setDropdown(false); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });

  // Mark the current section in the nav while scrolling the landing page
  var links = document.querySelectorAll('.nav-links a[href*="#"]');
  var map = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').split('#')[1];
    var sec = id && document.getElementById(id);
    if (sec) map[id] = a;
  });
  if ('IntersectionObserver' in window && Object.keys(map).length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }
})();
