(() => {
  'use strict';

  var progBar = document.createElement('div');
  progBar.id = 'scrollProgress';
  document.body.prepend(progBar);

  var smoothCB = 'cubic-bezier(0.22, 1, 0.36, 1)';

  function initGSAP() {
    if (typeof Lenis !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var lenis = new Lenis({ duration: 1.1, easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, wheelMultiplier: 0.8, touchMultiplier: 1.2, autoRaf: false });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
    }

    var isTouch = window.matchMedia('(hover: none)').matches;
    var isMobile = window.innerWidth <= 768;
    var soft = isTouch || isMobile;
    var softEase = 'power2.out';

    var pt = document.getElementById('pt');
    if (pt) {
      gsap.set(pt, { display: 'block' });
      gsap.fromTo(pt, { scaleY: 1, transformOrigin: 'bottom' }, { scaleY: 0, transformOrigin: 'bottom', duration: 0.8, ease: 'power3.inOut', delay: 0.05 });
    }

    var mainEl = document.querySelector('main');
    if (mainEl) {
      gsap.fromTo(mainEl, { opacity: 0, y: soft ? 6 : 16 }, { opacity: 1, y: 0, duration: soft ? 0.35 : 0.8, ease: soft ? 'power1.out' : smoothCB, clearProps: 'transform', delay: 0.12 });
    }

    if (!isTouch && !isMobile) {
      document.querySelectorAll('.hero h1, .blogs-header h2, .about-hero h1, .join-header h1, .signin-header h1, .profile-hero h1, .post-header h1').forEach(function(heading) {
        var html = '';
        heading.childNodes.forEach(function(n) {
          if (n.nodeType === 3) {
            n.textContent.split(/(\s+)/).forEach(function(p) {
              if (p.trim()) {
                html += '<span class="word"><span class="word-inner">' + p + '</span></span>';
              } else {
                html += p;
              }
            });
          } else {
            html += n.outerHTML || n.textContent;
          }
        });
        if (heading.querySelectorAll('.word').length > 1) {
          heading.innerHTML = html;
          gsap.from(heading.querySelectorAll('.word-inner'), {
            y: 50, rotateX: -15, opacity: 0,
            duration: 1, stagger: 0.04,
            ease: softEase, delay: 0.2
          });
        }
      });
    }

    if (typeof ScrollTrigger !== 'undefined') {
      var stStart = soft ? 'top 94%' : 'top 85%';
      var stDur = soft ? 0.35 : 1.1;

      gsap.utils.toArray('.reveal').forEach(function(el) {
        var delay = parseInt(el.dataset.revealDelay, 10) || 0;
        gsap.fromTo(el, { opacity: 0, y: soft ? 10 : 35, scale: soft ? 1 : 0.97 }, { opacity: 1, y: 0, scale: 1, duration: stDur, delay: delay / 1000, ease: smoothCB, scrollTrigger: { trigger: el, start: stStart, toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-scale').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, scale: soft ? 0.98 : 0.92 }, { opacity: 1, scale: 1, duration: soft ? 0.25 : 0.9, ease: softEase, scrollTrigger: { trigger: el, start: stStart, toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-left').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, x: soft ? -6 : -30 }, { opacity: 1, x: 0, duration: stDur, ease: smoothCB, scrollTrigger: { trigger: el, start: stStart, toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-right').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, x: soft ? 6 : 30 }, { opacity: 1, x: 0, duration: stDur, ease: smoothCB, scrollTrigger: { trigger: el, start: stStart, toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-img').forEach(function(el) {
        if (!isTouch && !isMobile) {
          gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true } });
        } else {
          gsap.set(el, { opacity: 1 });
        }
      });

      gsap.utils.toArray('.reveal-up').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, y: soft ? 12 : 45, scale: soft ? 1 : 0.96 }, { opacity: 1, y: 0, scale: 1, duration: soft ? 0.3 : 1.3, ease: soft ? softEase : 'power3.out', scrollTrigger: { trigger: el, start: stStart, toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.blogs-grid > *, .blog-masonry > *, .profile-grid-2 > *, .features > *, .mission-row > *, .team-grid > *, .featured-grid > *, .vibe-grid > *, .testimonial-grid > *, .badges-row > *, .join-grid > *, .about-grid > *').forEach(function(parent) {
        var items = parent.children;
        if (items.length > 1) {
          gsap.fromTo(items, { opacity: 0, y: soft ? 6 : 20 }, { opacity: 1, y: 0, duration: soft ? 0.2 : 0.55, stagger: soft ? 0.03 : 0.08, ease: smoothCB, scrollTrigger: { trigger: parent, start: soft ? 'top 96%' : 'top 90%', toggleActions: 'play none none none', once: true } });
        }
      });

      if (!isTouch && !isMobile) {
        gsap.utils.toArray('[data-parallax]').forEach(function(el) {
          var speed = parseFloat(el.dataset.parallax) || 0.1;
          gsap.to(el, { y: function() { return window.innerHeight * speed * 0.25; }, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
        });
      }

      gsap.utils.toArray('.skill-bar-fill').forEach(function(el) {
        var w = el.style.width || '0%';
        el.style.width = '0%';
        gsap.to(el, { width: w, duration: soft ? 0.7 : 1.6, ease: 'power3.out', scrollTrigger: { trigger: el.closest('.skill-bars') || el.parentElement, start: 'top 88%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.profile-stat-num[data-target]').forEach(function(el) {
        var target = parseInt(el.dataset.target, 10);
        if (!target) return;
        var obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: soft ? 0.8 : 2, ease: 'power2.out',
          scrollTrigger: { trigger: el.closest('.profile-stats') || el.parentElement, start: 'top 88%', toggleActions: 'play none none none', once: true },
          onUpdate: function() { el.textContent = Math.floor(obj.val).toLocaleString(); },
          onComplete: function() { el.textContent = target.toLocaleString(); }
        });
      });
    }

    window.refreshScrollTriggers = function() {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    };

    document.querySelectorAll('a:not([href^="#"]):not([href^="http"]):not([href^="https"]):not([target="_blank"])').forEach(function(a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('#') === 0 || href.indexOf('http') === 0 || href.indexOf('https') === 0 || href.indexOf('mailto') === 0 || href.indexOf('tel') === 0) return;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        if (isTouch) { window.location.href = href; return; }
        gsap.to(document.body, { opacity: 0, y: 6, scale: 0.99, duration: 0.35, ease: smoothCB, onComplete: function() { window.location.href = href; } });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }

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

  var header = document.getElementById('mainHeader');
  var navWrap = document.getElementById('navWrap');
  var lastScroll = 0;
  var scrollTicking = false;
  var scrollRAF = null;

  window.addEventListener('scroll', function() {
    if (scrollTicking) return;
    scrollTicking = true;
    scrollRAF = requestAnimationFrame(function() {
      var currentScroll = window.scrollY;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docH > 0 ? (currentScroll / docH) * 100 : 0;
      progBar.style.width = pct + '%';
      progBar.style.opacity = pct > 0 ? '1' : '0';

      if (header && navWrap) {
        if (currentScroll > 60) navWrap.classList.add('scrolled');
        else navWrap.classList.remove('scrolled');
        if (currentScroll > 100) {
          header.classList.toggle('hidden', currentScroll > lastScroll);
        } else {
          header.classList.remove('hidden');
        }
      }
      lastScroll = currentScroll;
      scrollTicking = false;
    });
  }, { passive: true });

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

  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  document.addEventListener('keydown', function(e) {
    var k = e.key.toLowerCase();
    if ((e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) || (e.ctrlKey && k === 'u') || e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault(); e.stopPropagation(); e.returnValue = false; return false;
    }
  }, { capture: true });
})();
