/* ═══════════════════════════════════════════════════════════════
   J & F Panadería Artesanal — main.js
   IIFE, sin módulos ES. Depende de: gsap.min.js, ScrollTrigger.min.js, manifest.js
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── safe wrapper ─────────────────────────────────────────── */
  function safe(fn, name) {
    try { fn(); }
    catch (e) { console.warn('[JYF] ' + name + ' falló:', e); }
  }

  /* ── Feature detection ────────────────────────────────────── */
  var isTouch = (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
  if (isTouch) document.body.classList.add('touch-device');

  /* ── GSAP registration ────────────────────────────────────── */
  var hasGSAP = (typeof gsap !== 'undefined');
  var hasST   = hasGSAP && (typeof ScrollTrigger !== 'undefined');
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ── DOM ready ────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  function onReady() {
    safe(initContent,      'content');   // primero: hidrata DOM desde datos.js
    safe(initSplash,       'splash');
    safe(initCursor,       'cursor');
    safe(initNav,          'nav');
    safe(initHero,         'hero');
    safe(initProducts,     'products');
    safe(initCalendar,     'calendar');
    safe(initBigOrders,    'bigOrders');
    safe(initForm,         'form');
    safe(initReveal,       'reveal');
    safe(initSafetyNet,    'safetyNet');
    safe(initMobileMenu,   'mobileMenu');
  }

  /* ══════════════════════════════════════════════════════════
     CONTENT — hidrata DOM desde datos.js (window.__JYF__)
     Editar datos.js → cambios visibles en la página.
     ══════════════════════════════════════════════════════════ */
  function initContent() {
    var jyf = window.__JYF__;
    if (!jyf) return;

    var brand = jyf.brand || {};
    var wa    = brand.whatsapp || '5492613442368';

    /* ── Reemplazar número en todos los links wa.me ── */
    document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
      a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + wa);
    });

    /* ── Reemplazar links de teléfono y su texto visible ── */
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      if (brand.telefono) {
        var digits = brand.telefono.replace(/[^+\d]/g, '');
        a.href = 'tel:' + digits;
        if (a.textContent.trim().match(/^\+?\d[\d\s\-().]+$/)) {
          a.textContent = brand.telefono;
        }
      }
    });

    /* ── Actualizar tarjetas de productos ── */
    var productos = jyf.productos;
    if (Array.isArray(productos)) {
      var cards = document.querySelectorAll('.product-card');
      cards.forEach(function (card, i) {
        var p = productos[i];
        if (!p) return;

        var nombre = card.querySelector('.product-name');
        if (nombre) nombre.textContent = p.nombre;

        var sub = card.querySelector('.product-subtitle');
        if (sub) sub.textContent = p.subtitulo;

        var desc = card.querySelector('.product-desc');
        if (desc) desc.textContent = p.descripcion;

        var serie = card.querySelector('.product-serie');
        if (serie) {
          serie.textContent = p.serie;
          serie.className   = 'product-serie ' + p.serie.toLowerCase();
        }

        var ingWrap = card.querySelector('.product-ingredients');
        if (ingWrap && Array.isArray(p.ingredientes)) {
          ingWrap.innerHTML = p.ingredientes.map(function (ing) {
            return '<li class="product-ingredient">' + ing + '</li>';
          }).join('');
        }
      });
    }

    /* ── Actualizar eslogan en hero tagline ── */
    if (brand.eslogan) {
      var tagline = document.querySelector('.hero-tagline');
      if (tagline) tagline.textContent = brand.eslogan;
    }

    /* ── Actualizar info de contacto en panel lateral del form ── */
    var infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(function (item) {
      var label = (item.querySelector('.info-item-label') || {}).textContent || '';
      var val   = item.querySelector('.info-item-value');
      if (!val) return;
      if (label.match(/Tel/i) && brand.telefono) {
        var a = val.querySelector('a');
        if (a) { a.textContent = brand.telefono; a.href = 'tel:' + brand.telefono.replace(/[^+\d]/g, ''); }
      }
      if (label.match(/Direcci/i) && brand.direccion) {
        /* solo actualiza el primer text node para no pisar subelementos */
        val.childNodes.forEach(function (n) {
          if (n.nodeType === 3 && n.textContent.match(/Las Heras|Mendoza/)) {
            n.textContent = brand.direccion + '\n';
          }
        });
      }
    });

    /* ── Actualizar horarios en info lateral ── */
    var horario = jyf.horario || {};
    infoItems.forEach(function (item) {
      var label = (item.querySelector('.info-item-label') || {}).textContent || '';
      var val   = item.querySelector('.info-item-value');
      if (!val) return;
      if (label.match(/semana|lunes|sábado/i) && horario.semana) {
        val.textContent = horario.semana;
      }
      if (label.match(/domingo/i) && horario.domingo) {
        val.textContent = horario.domingo;
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     SPLASH
     ══════════════════════════════════════════════════════════ */
  function initSplash() {
    var splash = document.getElementById('splash');
    if (!splash) return;

    // JS safety net — remove after 4.8s (CSS animation is 4.5s)
    setTimeout(function () {
      splash.style.opacity = '0';
      splash.style.pointerEvents = 'none';
      setTimeout(function () {
        splash.style.display = 'none';
      }, 700);
    }, 4800);
  }

  /* ══════════════════════════════════════════════════════════
     CURSOR
     ══════════════════════════════════════════════════════════ */
  function initCursor() {
    if (isTouch) return;
    var cursor = document.getElementById('cursor');
    if (!cursor) return;
    var ring  = cursor.querySelector('.cursor-ring');
    var label = cursor.querySelector('.cursor-label');

    var cx = 0, cy = 0;

    document.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      if (hasGSAP) {
        gsap.to(cursor, { x: cx, y: cy, duration: 0.12, ease: 'power2.out' });
      } else {
        cursor.style.transform = 'translate(' + (cx - 20) + 'px,' + (cy - 20) + 'px) translate(-50%,-50%)';
      }
    });

    var labelMap = {
      'a[href*="wa.me"]':        'WhatsApp',
      '.cta-primary':            'Pedir',
      '.cta-secondary':          'Ver',
      '.product-card':           'Ver',
      '.about-photo':            'Mirar',
      '.gallery-item':           'Oler',
      '.big-orders-card':        'Encargar',
      '.pedido-form':            'Enviar',
      '.nav-link':               'Ir',
      '#footer':                 'Arriba',
      '.footer-back':            'Arriba',
      'a[href^="#"]':            'Ir',
      'button[type="submit"]':   'Enviar',
      '.calendar-card':          'Leer',
    };

    document.addEventListener('mouseover', function (e) {
      var el = e.target;
      var txt = null;
      for (var sel in labelMap) {
        if (el.closest(sel)) { txt = labelMap[sel]; break; }
      }
      if (txt) {
        label.textContent = txt;
        cursor.classList.add('has-label', 'expanded');
      } else {
        cursor.classList.remove('has-label', 'expanded');
      }
    });

    document.addEventListener('mousedown', function () {
      if (hasGSAP) gsap.to(ring, { scale: 0.82, duration: 0.1 });
    });
    document.addEventListener('mouseup', function () {
      if (hasGSAP) gsap.to(ring, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
    });
  }

  /* ══════════════════════════════════════════════════════════
     NAV
     ══════════════════════════════════════════════════════════ */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════
     MOBILE MENU
     ══════════════════════════════════════════════════════════ */
  function initMobileMenu() {
    var burger  = document.getElementById('nav-burger');
    var overlay = document.getElementById('nav-mobile-overlay');
    if (!burger || !overlay) return;

    var open = false;
    function toggle() {
      open = !open;
      burger.classList.toggle('open', open);
      overlay.style.display = open ? 'flex' : 'none';
      requestAnimationFrame(function () {
        overlay.classList.toggle('open', open);
      });
      document.body.style.overflow = open ? 'hidden' : '';
    }

    burger.addEventListener('click', toggle);
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { if (open) toggle(); });
    });
  }

  /* ══════════════════════════════════════════════════════════
     HERO
     ══════════════════════════════════════════════════════════ */
  function initHero() {
    if (!hasGSAP) return;
    var hero    = document.getElementById('hero');
    if (!hero) return;

    var kicker  = hero.querySelector('.hero-kicker');
    var title   = hero.querySelector('.hero-title');
    var tagline = hero.querySelector('.hero-tagline');
    var ctas    = hero.querySelector('.hero-ctas');

    var tl = gsap.timeline({ delay: 3.8 }); // after splash
    if (kicker)  tl.fromTo(kicker,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
    if (title)   tl.fromTo(title,   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.15);
    if (tagline) tl.fromTo(tagline, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
    if (ctas)    tl.fromTo(ctas,    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.65);

    // Parallax on scroll
    if (hasST) {
      var bg = hero.querySelector('.hero-bg');
      if (bg) {
        gsap.to(bg, {
          y: '25%',
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
        });
      }
    }
  }

  /* ══════════════════════════════════════════════════════════
     PRODUCTS — Horizontal Scroll + SVG Draw
     ══════════════════════════════════════════════════════════ */
  function initProducts() {
    var section = document.getElementById('productos');
    if (!section) return;

    var wrap    = section.querySelector('.products-track-wrap');
    var track   = section.querySelector('.products-track');
    var cards   = section.querySelectorAll('.product-card');
    var numEl   = section.querySelector('.progress-current');

    if (!wrap || !track || !cards.length) return;

    // Progress counter update
    function updateProgress(idx) {
      if (numEl) numEl.textContent = String(idx + 1).padStart(2, '0');
    }

    // SVG animation for a card
    function animateSVGCard(card) {
      var paths = card.querySelectorAll('.svg-animate');
      if (!paths.length) return;

      paths.forEach(function (p) {
        var len = 0;
        try { len = p.getTotalLength(); } catch(e) { len = 300; }
        if (!len) len = 300;
        p.setAttribute('stroke-dasharray', len);
        p.setAttribute('stroke-dashoffset', len);
        p.style.strokeDasharray  = len;
        p.style.strokeDashoffset = len;
      });

      if (hasGSAP) {
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.8,
          stagger: 0.18,
          ease: 'power2.inOut',
          delay: 0.2,
        });
      } else {
        // CSS fallback: just show them
        paths.forEach(function (p) {
          p.style.strokeDashoffset = 0;
          p.style.transition = 'stroke-dashoffset 1.8s ease';
        });
      }
    }

    // Desktop: GSAP horizontal pin
    var isDesktop = !isTouch && window.matchMedia('(min-width: 769px)').matches;

    if (isDesktop && hasST) {
      var totalScroll = track.scrollWidth - window.innerWidth;

      var hTween = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: function () { return '+=' + totalScroll; },
          onUpdate: function (self) {
            var idx = Math.round(self.progress * (cards.length - 1));
            updateProgress(idx);
          },
          invalidateOnRefresh: true,
        }
      });

      // Trigger SVG draw when each card enters the pinned viewport
      cards.forEach(function (card, i) {
        var drawn = false;
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: hTween,
          start: 'left 80%',
          onEnter: function () {
            if (!drawn) { drawn = true; animateSVGCard(card); }
          },
        });
      });

    } else {
      // Mobile: IntersectionObserver for SVG draw + progress
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var card = entry.target;
            animateSVGCard(card);
            var idx = Array.from(cards).indexOf(card);
            updateProgress(idx);
            observer.unobserve(card);
          }
        });
      }, { threshold: 0.4, root: wrap });

      cards.forEach(function (c) { observer.observe(c); });
    }
  }

  /* ══════════════════════════════════════════════════════════
     CALENDAR CARDS
     ══════════════════════════════════════════════════════════ */
  function initCalendar() {
    if (!hasST) return;
    var cards = document.querySelectorAll('.calendar-card');
    if (!cards.length) return;

    cards.forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        }
      );
    });
  }

  /* ══════════════════════════════════════════════════════════
     BIG ORDERS — Tilt card
     ══════════════════════════════════════════════════════════ */
  function initBigOrders() {
    if (isTouch) return;
    var card = document.querySelector('.big-orders-card');
    if (!card) return;

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width  - 0.5;
      var y = (e.clientY - rect.top)  / rect.height - 0.5;
      if (hasGSAP) {
        gsap.to(card, { rotateY: x * 12, rotateX: -y * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
      }
    });
    card.addEventListener('mouseleave', function () {
      if (hasGSAP) gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' });
    });
  }

  /* ══════════════════════════════════════════════════════════
     FORM → WhatsApp
     ══════════════════════════════════════════════════════════ */
  function initForm() {
    var form = document.getElementById('pedido-form');
    if (!form) return;

    var data = (window.__JYF__ && window.__JYF__.brand) || {};
    var wa   = data.whatsapp || '5492613442368';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nombre   = (form.querySelector('[name="nombre"]').value   || '').trim();
      var telefono = (form.querySelector('[name="telefono"]').value  || '').trim();
      var producto = (form.querySelector('[name="producto"]').value  || '').trim();
      var cantidad = (form.querySelector('[name="cantidad"]').value  || '').trim();
      var nota     = (form.querySelector('[name="nota"]').value      || '').trim();

      var lines = [
        '🥐 *Pedido J & F Panadería*',
        '──────────────────',
        '👤 *Nombre:* ' + (nombre || '—'),
        '📞 *Teléfono:* ' + (telefono || '—'),
        '🛒 *Producto:* ' + (producto || '—'),
        '🔢 *Cantidad:* ' + (cantidad || '—'),
      ];
      if (nota) lines.push('📝 *Nota:* ' + nota);
      lines.push('──────────────────');
      lines.push('_Enviado desde jyf-panaderia.com_');

      var msg = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + wa + '?text=' + msg, '_blank');
    });
  }

  /* ══════════════════════════════════════════════════════════
     REVEAL — Scroll-based reveal with GSAP + IntersectionObserver
     ══════════════════════════════════════════════════════════ */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!hasGSAP) return; // CSS fallback already shows content

    targets.forEach(function (el) {
      var dir  = el.dataset.dir  || 'up';
      var del  = parseFloat(el.dataset.delay || 0);
      var from = { opacity: 0 };
      if (dir === 'up')    { from.y = 36; }
      if (dir === 'left')  { from.x = 40; }
      if (dir === 'right') { from.x = -40; }

      gsap.set(el, from);

      if (hasST) {
        gsap.to(el, {
          opacity: 1, x: 0, y: 0,
          duration: 0.9,
          delay: del,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      } else {
        // IntersectionObserver fallback
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 0.9, delay: del, ease: 'power3.out' });
              obs.unobserve(el);
            }
          });
        }, { threshold: 0.05 });
        obs.observe(el);
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     SAFETY NET — reveal everything hidden after 6s
     ══════════════════════════════════════════════════════════ */
  function initSafetyNet() {
    setTimeout(function () {
      document.querySelectorAll('.reveal, .hero-kicker, .hero-tagline, .hero-ctas, [data-split]').forEach(function (el) {
        el.style.opacity  = '1';
        el.style.transform = 'none';
      });
      // Also reveal any hidden SVG paths
      document.querySelectorAll('.svg-animate').forEach(function (p) {
        p.style.strokeDashoffset = '0';
        p.style.transition = 'stroke-dashoffset 1.2s ease';
      });
    }, 6000);
  }

  /* ══════════════════════════════════════════════════════════
     SMOOTH ANCHOR SCROLL
     ══════════════════════════════════════════════════════════ */
  safe(function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id  = a.getAttribute('href').slice(1);
        var el  = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
        var top  = el.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }, 'smoothScroll');

})();
