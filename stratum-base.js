/**
 * GitHub Pages project sites are served under /repo-name/.
 * Root-absolute paths (/design-system.css, /about) break on *.github.io/user/repo
 * but stay correct on a custom domain at /. This script rewrites those paths only
 * on github.io hosts.
 */
(function () {
  'use strict';

  var base = '';
  if (location.hostname.endsWith('github.io')) {
    var seg = location.pathname.split('/').filter(Boolean)[0];
    if (seg) base = '/' + seg;
  }

  window.__STRATUM_BASE = base;

  function abs(path) {
    if (!base || !path || path.charAt(0) !== '/' || path.indexOf('//') === 0) return path;
    return base + path;
  }

  function rewrite(el, attr) {
    var val = el.getAttribute(attr);
    if (val) el.setAttribute(attr, abs(val));
  }

  /* Inject stylesheet with correct base before parser sees a broken /design-system.css */
  document.write('<link rel="stylesheet" href="' + base + '/design-system.css">');

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="/"], link[href^="/"], script[src^="/"]').forEach(function (el) {
      rewrite(el, 'href');
      rewrite(el, 'src');
    });
  });
})();
