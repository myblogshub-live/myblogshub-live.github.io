(function() {
  'use strict';

  var mainEl = document.querySelector('main');
  if (!mainEl) return;

  var currentPath = location.pathname + location.search;
  var loadedExt = new Set();
  document.querySelectorAll('script[src]').forEach(function(s) {
    loadedExt.add(s.getAttribute('src'));
  });

  function isShared(src) {
    return src.indexOf('gsap') !== -1 || src.indexOf('tailwindcss') !== -1 ||
      src.indexOf('font-awesome') !== -1 || src.indexOf('app.js') !== -1 ||
      src.indexOf('router.js') !== -1;
  }

  function isMiniPlayer(text) {
    return text.indexOf("localStorage.getItem('podcast_id')") !== -1;
  }

  function getPageScripts(html) {
    var result = [];
    var d = new DOMParser().parseFromString(html, 'text/html');
    var all = d.querySelectorAll('script');
    all.forEach(function(s) {
      var src = s.getAttribute('src') || '';
      var txt = s.textContent || '';
      if (src && isShared(src)) return;
      if (txt && isMiniPlayer(txt)) return;
      if (src && txt === '') result.push({ t: 'src', v: src });
      else if (txt.trim()) result.push({ t: 'txt', v: txt });
    });
    return result;
  }

  function runScripts(list, cb) {
    var n = list.length;
    if (!n) { if (cb) cb(); return; }
    var done = 0;
    function next() { done++; if (done >= n && cb) cb(); }
    list.forEach(function(item) {
      if (item.t === 'src') {
        if (loadedExt.has(item.v)) { next(); return; }
        var el = document.createElement('script');
        el.src = item.v;
        el.onload = function() { loadedExt.add(item.v); next(); };
        el.onerror = next;
        document.body.appendChild(el);
      } else {
        try {
          var el = document.createElement('script');
          el.textContent = item.v;
          document.body.appendChild(el);
          document.body.removeChild(el);
        } catch(e) {}
        next();
      }
    });
  }

  function needsFullNav(href) {
    return href.indexOf('blogs.html') !== -1 || href.indexOf('podcasts.html') !== -1 || href.indexOf('podcast-detail.html') !== -1;
  }

  function navigate(href, isPop) {
    if (href === currentPath) { if (isPop) window.location.reload(); return; }
    if (needsFullNav(href)) { window.location.href = href; return; }
    fetch(href).then(function(r) { return r.text(); }).then(function(html) {
      var d = new DOMParser().parseFromString(html, 'text/html');
      var nm = d.querySelector('main');
      var nt = d.querySelector('title');
      if (!nm) { window.location.href = href; return; }
      var sc = getPageScripts(html);
      gsap.to(mainEl, { opacity: 0, y: 6, duration: 0.12, ease: 'power2.out',
        onComplete: function() {
          mainEl.innerHTML = nm.innerHTML;
          window.scrollTo(0, 0);
          if (nt) document.title = nt.textContent;
          if (!isPop) history.pushState(null, '', href);
          currentPath = href;
          runScripts(sc, function() {
            gsap.fromTo(mainEl, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
            if (typeof refreshScrollTriggers === 'function') refreshScrollTriggers();
          });
        }
      });
    }).catch(function() { window.location.href = href; });
  }

  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.indexOf('#') === 0 || href.indexOf('http') === 0 ||
      href.indexOf('https') === 0 || href.indexOf('mailto') === 0 ||
      href.indexOf('tel') === 0 || a.getAttribute('target') === '_blank') return;
    e.preventDefault();
    navigate(href);
  });

  window.addEventListener('popstate', function() {
    navigate(location.pathname + location.search, true);
  });

  window.routerNavigate = navigate;
})();
