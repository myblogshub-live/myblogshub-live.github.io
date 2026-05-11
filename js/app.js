(() => {
  'use strict';

  function initGSAP() {
    var smoothCB = 'cubic-bezier(0.22, 1, 0.36, 1)';

    // === Page Entrance ===
    var mainEl = document.querySelector('main');
    if (mainEl) {
      gsap.fromTo(mainEl, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: smoothCB, clearProps: 'transform' });
    }

    // === ScrollTrigger Reveals ===
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.reveal').forEach(function(el) {
        var delay = parseInt(el.dataset.revealDelay, 10) || 0;
        gsap.fromTo(el, { opacity: 0, y: 45, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, delay: delay / 1000, ease: smoothCB, scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-scale').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none', once: true } });
      });

      // Stagger grid items
      gsap.utils.toArray('.blogs-grid > *, .podcasts-grid > *, .podcast-home-grid > *, .podcast-episodes-grid > *, .related-grid > *, .pro-grid > *, .featured-layout > *, .profile-grid-2 > *, .profile-grid-3 > *, .features > *, .mission-row > *, .team-grid > *, .featured-grid > *, .vibe-grid > *, .testimonial-grid > *, .badges-row > *').forEach(function(parent) {
        var items = parent.children;
        if (items.length > 1) {
          gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: smoothCB, scrollTrigger: { trigger: parent, start: 'top 90%', toggleActions: 'play none none none', once: true } });
        }
      });

      // Parallax
      gsap.utils.toArray('[data-parallax]').forEach(function(el) {
        var speed = parseFloat(el.dataset.parallax) || 0.12;
        gsap.to(el, { y: function() { return window.innerHeight * speed * 0.3; }, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }

    // === Page transition ===
    document.querySelectorAll('a:not([href^="#"]):not([href^="http"]):not([href^="https"]):not([target="_blank"])').forEach(function(a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('#') === 0 || href.indexOf('http') === 0 || href.indexOf('https') === 0 || href.indexOf('mailto') === 0 || href.indexOf('tel') === 0) return;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        gsap.to(document.body, { opacity: 0, y: 8, scale: 0.98, duration: 0.3, ease: smoothCB, onComplete: function() { window.location.href = href; } });
      });
    });
  }

  // === Run initGSAP on DOMContentLoaded ===
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }

  // === NON-GSAP CODE (runs immediately) ===

  // === 3D Tilt on cards (mouse only) ===
  if (window.matchMedia('(hover: hover)').matches) {
    var tiltTicking = false;
    document.querySelectorAll('.tilt-card').forEach(function(card) {
      var inner = card.querySelector('.tilt-card-inner') || card;
      card.addEventListener('mousemove', function(e) {
        if (tiltTicking) return;
        tiltTicking = true;
        requestAnimationFrame(function() {
          var rect = card.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - 0.5;
          var y = (e.clientY - rect.top) / rect.height - 0.5;
          inner.style.transform = 'perspective(1200px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
          tiltTicking = false;
        });
      });
      card.addEventListener('mouseleave', function() {
        inner.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      });
    });
  }

  // === Ripple effect (mouse only) ===
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.ripple-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var rect = this.getBoundingClientRect();
        var r = document.createElement('span');
        r.className = 'ripple';
        var size = Math.max(rect.width, rect.height);
        r.style.width = r.style.height = size + 'px';
        r.style.left = (e.clientX - rect.left - size / 2) + 'px';
        r.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(r);
        setTimeout(function() { r.remove(); }, 600);
      });
    });
  }

  // === Magnetic nav links (mouse only) ===
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.nav-links a:not(.join-hub-btn), .logo').forEach(function(el) {
      el.addEventListener('mousemove', function(e) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.12;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.12;
        el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
      });
    });
  }

  // === Dropdown logic ===
  document.querySelectorAll('.dropdown-parent').forEach(function(dropdown) {
    var timeout;
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth <= 768) return;
      clearTimeout(timeout);
      dropdown.classList.remove('open');
      dropdown.classList.add('show');
    });
    dropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth <= 768) return;
      timeout = setTimeout(function() { dropdown.classList.remove('show'); }, 200);
    });
    dropdown.addEventListener('click', function(e) {
      if (window.innerWidth > 768) return;
      if (e.target.closest('.dropdown-menu')) return;
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('open');
      var icon = this.querySelector('.dropdown-toggle i');
      if (icon) icon.classList.toggle('open');
      this.classList.remove('show');
    });
  });

  var scrollPos = 0;

  function closeMenu() {
    var n = document.getElementById('navLinks');
    if (!n) return;
    n.classList.remove('active');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    if (scrollPos) window.scrollTo(0, scrollPos);
    var closeBtn = document.getElementById('closeBtn');
    if (closeBtn) closeBtn.style.display = 'none';
  }

  window.closeMenu = closeMenu;

  window.toggleMenu = function() {
    var n = document.getElementById('navLinks');
    var c = document.getElementById('closeBtn');
    if (!n) return;
    var isOpen = !n.classList.contains('active');
    n.classList.toggle('active');
    if (isOpen) {
      scrollPos = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollPos + 'px';
      document.body.style.width = '100%';
    } else {
      closeMenu();
      return;
    }
    if (c) c.style.display = isOpen ? 'block' : 'none';
  };

  function resetDropdowns() {
    document.querySelectorAll('.dropdown-parent').forEach(function(dp) {
      dp.classList.remove('open');
      dp.classList.remove('show');
      var icon = dp.querySelector('.dropdown-toggle i');
      if (icon) icon.classList.remove('open');
    });
  }

  resetDropdowns();

  var resizeRAF = null;
  window.addEventListener('resize', function() {
    if (resizeRAF) cancelAnimationFrame(resizeRAF);
    resizeRAF = requestAnimationFrame(function() {
      if (window.innerWidth > 768) {
        closeMenu();
        resetDropdowns();
      } else {
        resetDropdowns();
        var nl = document.getElementById('navLinks');
        if (nl && nl.classList.contains('active')) {
          scrollPos = window.scrollY;
          document.body.style.position = 'fixed';
          document.body.style.top = '-' + scrollPos + 'px';
          document.body.style.width = '100%';
        }
      }
      resizeRAF = null;
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
      resetDropdowns();
    }
  });

  document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) return;
    if (e.target.closest('.nav-links') || e.target.closest('#closeBtn') || e.target.closest('.hamburger-icon')) return;
    resetDropdowns();
  });

  // === Theme toggle ===
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('mbh-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    if (localStorage.getItem('mbh-theme') === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  // === Header scroll behavior ===
  var header = document.getElementById('mainHeader');
  var navWrap = document.getElementById('navWrap');
  var lastScroll = 0;
  var scrollTicking = false;

  if (header && navWrap) {
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          var currentScroll = window.scrollY;
          if (currentScroll > 60) navWrap.classList.add('scrolled');
          else navWrap.classList.remove('scrolled');
          if (currentScroll > 100) {
            header.classList.toggle('hidden', currentScroll > lastScroll);
          } else {
            header.classList.remove('hidden');
          }
          lastScroll = currentScroll;
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  // === Counter animation ===
  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    if (!target || target === 0) return;
    var duration = 1800;
    var start = performance.now();
    function update(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
    }
    requestAnimationFrame(update);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach(function(el) {
          var suffix = el.dataset.suffix || '';
          var original = el.textContent;
          if (!el.dataset.target) el.dataset.target = original.replace(/[^0-9]/g, '');
          el.dataset.suffix = suffix;
          animateCounter(el);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stats-row, .stat-item').forEach(function(el) { counterObserver.observe(el); });

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Disable right-click context menu ===
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

  // === Disable view-source & DevTools shortcuts ===
  document.addEventListener('keydown', function(e) {
    var k = e.key.toLowerCase();
    if (
      (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) ||
      (e.ctrlKey && k === 'u') ||
      e.key === 'F12' || e.keyCode === 123
    ) {
      e.preventDefault();
      e.stopPropagation();
      e.returnValue = false;
      return false;
    }
  }, { capture: true });
})();
