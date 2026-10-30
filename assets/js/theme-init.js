/* Runs in <head> before first paint so the saved theme and language never flash. */
(function () {
  'use strict';
  var root = document.documentElement;
  var theme = null;
  var lang = null;

  root.classList.add('js');
  try {
    theme = localStorage.getItem('nova-theme');
    lang = localStorage.getItem('nova-lang');
  } catch (e) { /* storage unavailable (private mode) */ }

  root.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
  if (lang === 'en') root.setAttribute('lang', 'en');
})();
