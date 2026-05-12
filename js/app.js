(() => {
  'use strict';

  var progBar = document.createElement('div');
  progBar.id = 'scrollProgress';
  document.body.prepend(progBar);
  var riderWrap = document.createElement('div');
  riderWrap.id = 'riderWrap';
  var riderLine = document.createElement('div');
  riderLine.id = 'riderLine';
  var riderBtn = document.createElement('button');
  riderBtn.id = 'riderBtn';
  riderBtn.innerHTML = '<i class="fas fa-arrow-up"></i><div class="grip"><span></span><span></span><span></span></div>';
  riderWrap.appendChild(riderLine);
  riderWrap.appendChild(riderBtn);
  document.body.appendChild(riderWrap);

  var smoothCB = 'cubic-bezier(0.22, 1, 0.36, 1)';

  function initGSAP() {
    var isTouch = window.matchMedia('(hover: none)').matches;

    var pt = document.getElementById('pt');
    if (pt) {
      gsap.set(pt, { display: 'block' });
      gsap.fromTo(pt, { scaleY: 1, transformOrigin: 'bottom' }, { scaleY: 0, transformOrigin: 'bottom', duration: 0.9, ease: 'power4.inOut', delay: 0.05 });
    }

    var mainEl = document.querySelector('main');
    if (mainEl) {
      gsap.fromTo(mainEl, { opacity: 0, y: isTouch ? 10 : 20 }, { opacity: 1, y: 0, duration: isTouch ? 0.4 : 0.7, ease: smoothCB, clearProps: 'transform', delay: 0.2 });
    }

    if (!isTouch) {
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
            y: 120, rotateX: -35, opacity: 0,
            duration: 1.1, stagger: 0.035,
            ease: 'power4.out', delay: 0.3
          });
        }
      });
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.reveal').forEach(function(el) {
        var delay = parseInt(el.dataset.revealDelay, 10) || 0;
        gsap.fromTo(el, { opacity: 0, y: isTouch ? 18 : 40, scale: isTouch ? 1 : 0.96 }, { opacity: 1, y: 0, scale: 1, duration: isTouch ? 0.45 : 1, delay: delay / 1000, ease: smoothCB, scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-scale').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, scale: isTouch ? 0.95 : 0.88 }, { opacity: 1, scale: 1, duration: isTouch ? 0.35 : 0.85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-left').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, x: isTouch ? -12 : -35 }, { opacity: 1, x: 0, duration: isTouch ? 0.4 : 0.85, ease: smoothCB, scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-right').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, x: isTouch ? 12 : 35 }, { opacity: 1, x: 0, duration: isTouch ? 0.4 : 0.85, ease: smoothCB, scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.reveal-img').forEach(function(el) {
        if (!isTouch) {
          gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none', once: true } });
        }
      });

      gsap.utils.toArray('.reveal-up').forEach(function(el) {
        gsap.fromTo(el, { opacity: 0, y: isTouch ? 25 : 55, scale: isTouch ? 1 : 0.94 }, { opacity: 1, y: 0, scale: 1, duration: isTouch ? 0.5 : 1.2, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.blogs-grid > *, .blog-masonry > *, .profile-grid-2 > *, .features > *, .mission-row > *, .team-grid > *, .featured-grid > *, .vibe-grid > *, .testimonial-grid > *, .badges-row > *, .join-grid > *, .about-grid > *').forEach(function(parent) {
        var items = parent.children;
        if (items.length > 1) {
          gsap.fromTo(items, { opacity: 0, y: isTouch ? 12 : 25, rotateX: isTouch ? 0 : -5 }, { opacity: 1, y: 0, rotateX: 0, duration: isTouch ? 0.3 : 0.5, stagger: isTouch ? 0.04 : 0.07, ease: smoothCB, scrollTrigger: { trigger: parent, start: 'top 92%', toggleActions: 'play none none none', once: true } });
        }
      });

      if (!isTouch) {
        gsap.utils.toArray('[data-parallax]').forEach(function(el) {
          var speed = parseFloat(el.dataset.parallax) || 0.12;
          gsap.to(el, { y: function() { return window.innerHeight * speed * 0.3; }, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      }

      gsap.utils.toArray('.skill-bar-fill').forEach(function(el) {
        var w = el.style.width || '0%';
        el.style.width = '0%';
        gsap.to(el, { width: w, duration: 1.5, ease: 'power4.out', scrollTrigger: { trigger: el.closest('.skill-bars') || el.parentElement, start: 'top 85%', toggleActions: 'play none none none', once: true } });
      });

      gsap.utils.toArray('.profile-stat-num[data-target]').forEach(function(el) {
        var target = parseInt(el.dataset.target, 10);
        if (!target) return;
        var obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.8, ease: 'power3.out',
          scrollTrigger: { trigger: el.closest('.profile-stats') || el.parentElement, start: 'top 85%', toggleActions: 'play none none none', once: true },
          onUpdate: function() { el.textContent = Math.floor(obj.val).toLocaleString(); },
          onComplete: function() { el.textContent = target.toLocaleString(); }
        });
      });
    }

    (function() {
      var rl = document.getElementById('riderLine');
      var rb = document.getElementById('riderBtn');
      if (rl && !rl.dataset.animated) {
        rl.dataset.animated = '1';
        var baseH = window.innerWidth <= 420 ? 35 : window.innerWidth <= 768 ? 45 : 60;
        gsap.set(rl, { height: 0 });
        gsap.to(rl, { height: baseH, duration: 0.5, ease: 'power3.inOut', delay: 0.4 });
      }
      if (rb && !rb.dataset.animated) {
        rb.dataset.animated = '1';
        gsap.fromTo(rb, { opacity: 0, scale: 0.35, y: -8 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.5)', delay: 0.6 });
      }
    })();

    window.refreshScrollTriggers = function() {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    };

    document.querySelectorAll('a:not([href^="#"]):not([href^="http"]):not([href^="https"]):not([target="_blank"])').forEach(function(a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('#') === 0 || href.indexOf('http') === 0 || href.indexOf('https') === 0 || href.indexOf('mailto') === 0 || href.indexOf('tel') === 0) return;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        if (isTouch) { window.location.href = href; return; }
        gsap.to(document.body, { opacity: 0, y: 8, scale: 0.98, duration: 0.3, ease: smoothCB, onComplete: function() { window.location.href = href; } });
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

  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      requestAnimationFrame(function() {
        var currentScroll = window.scrollY;
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docH > 0 ? (currentScroll / docH) * 100 : 0;
        progBar.style.width = pct + '%';
        progBar.style.opacity = pct > 0 ? '1' : '0';

        var baseH = window.innerWidth <= 420 ? 35 : window.innerWidth <= 768 ? 45 : 60;
        var maxRiderY = window.innerHeight - 142;
        var riderY = docH > 0 ? (currentScroll / docH) * maxRiderY : 0;
        riderLine.style.height = (baseH + riderY) + 'px';

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
      scrollTicking = true;
    }
  }, { passive: true });

  var getBaseH = function() { return window.innerWidth <= 420 ? 35 : window.innerWidth <= 768 ? 45 : 60; };
  var isDragging = false;
  var dragStartY = 0;
  var dragStartScroll = 0;
  var dragMoved = false;

  riderBtn.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragMoved = false;
    dragStartY = e.clientY;
    dragStartScroll = window.scrollY;
    riderBtn.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    var deltaY = e.clientY - dragStartY;
    if (Math.abs(deltaY) > 4) dragMoved = true;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    var maxRiderY = window.innerHeight - 142;
    var scrollDelta = (deltaY / maxRiderY) * docH;
    window.scrollTo({ top: Math.max(0, Math.min(docH, dragStartScroll + scrollDelta)), behavior: 'auto' });
  });

  document.addEventListener('mouseup', function() {
    if (!isDragging) return;
    isDragging = false;
    riderBtn.style.cursor = '';
    if (!dragMoved) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      riderLine.style.height = getBaseH() + 'px';
      gsap.fromTo(riderBtn, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  });

  riderBtn.addEventListener('touchstart', function(e) {
    isDragging = true;
    dragMoved = false;
    dragStartY = e.touches[0].clientY;
    dragStartScroll = window.scrollY;
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    var deltaY = e.touches[0].clientY - dragStartY;
    if (Math.abs(deltaY) > 4) dragMoved = true;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    var maxRiderY = window.innerHeight - 142;
    var scrollDelta = (deltaY / maxRiderY) * docH;
    window.scrollTo({ top: Math.max(0, Math.min(docH, dragStartScroll + scrollDelta)), behavior: 'auto' });
  }, { passive: true });

  document.addEventListener('touchend', function() {
    if (!isDragging) return;
    isDragging = false;
    if (!dragMoved) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      riderLine.style.height = getBaseH() + 'px';
      gsap.fromTo(riderBtn, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  });

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
