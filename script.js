/* ═══════════════════════════════════════════════════════════
   JINESH MODI — PREMIUM CINEMATIC BIODATA
   script.js — All interactions, animations, and effects
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── FEATURE DETECTION ── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isTouch = 'ontouchstart' in window;

/* ═══════════════════════════════════════════════
   1. LOADER
═══════════════════════════════════════════════ */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const done = () => {
    loader.classList.add('loaded');
    // Remove from DOM after transition
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    document.body.classList.remove('loading');
  };

  // Minimum 800ms to show branding, max 2s
  const minTime = prefersReducedMotion ? 0 : 800;
  const start = Date.now();

  if (document.readyState === 'complete') {
    const elapsed = Date.now() - start;
    setTimeout(done, Math.max(0, minTime - elapsed));
  } else {
    window.addEventListener('load', () => {
      const elapsed = Date.now() - start;
      setTimeout(done, Math.max(0, minTime - elapsed));
    }, { once: true });
  }
})();

/* ═══════════════════════════════════════════════
   2. SCROLL PROGRESS
═══════════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ═══════════════════════════════════════════════
   3. NAVBAR — scroll state + active section + hamburger
═══════════════════════════════════════════════ */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-link');
  const burger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');
  if (!navbar) return;

  /* Scroll → shrink */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    /* Back-to-top */
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active section detection */
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach(s => observer.observe(s));

  /* Hamburger */
  const toggleMenu = (open) => {
    burger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', () => toggleMenu(!burger.classList.contains('open')));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* Close mobile menu on outside click */
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });
})();

/* ═══════════════════════════════════════════════
   4. CUSTOM CURSOR
═══════════════════════════════════════════════ */
(function initCursor() {
  if (isTouch || prefersReducedMotion) return;
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let rafId = null;

  const update = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(update);
  };

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  const hoverEls = 'a, button, .tilt-card, .contact-card, .nav-link, .hero-cta, .interest-card, .gallery-item, .video-card, .brain-card, .oop-card';
  const imageEls = '.interest-card-photo, .portrait-frame, .gallery-item img';

  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  document.querySelectorAll(imageEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-image'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-image'));
  });

  rafId = requestAnimationFrame(update);

  /* Pause the cursor RAF loop when the tab is hidden (matches particles) */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); rafId = null; }
    else if (!rafId) { rafId = requestAnimationFrame(update); }
  });
})();

/* ═══════════════════════════════════════════════
   5. PARTICLE CANVAS
═══════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], rafId, mouseX = -1000, mouseY = -1000;

  /* Responsive particle count */
  const getCount = () => {
    const area = W * H;
    if (isMobile) return Math.floor(area / 18000);
    return Math.min(Math.floor(area / 9000), 80);
  };

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticlesArray();
  };

  const initParticlesArray = () => {
    const count = getCount();
    particles = Array.from({ length: count }, () => createParticle());
  };

  const createParticle = (x, y) => ({
    x: x ?? Math.random() * W,
    y: y ?? Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3 - 0.1,
    size: Math.random() * 1.8 + 0.4,
    alpha: Math.random() * 0.5 + 0.1,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    /* color: gold, rose, purple in ratios */
    color: [
      'rgba(245,199,106,',
      'rgba(244,63,94,',
      'rgba(192,38,211,',
      'rgba(255,255,255,'
    ][Math.floor(Math.random() * 4)],
    life: 1,
    maxLife: Math.random() * 400 + 200,
    age: Math.random() * 200,
  });

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.age++;
      if (p.age > p.maxLife) {
        particles[i] = createParticle();
        return;
      }

      /* Fade in/out */
      const lifeRatio = p.age / p.maxLife;
      const fade = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.9 ? (1 - lifeRatio) * 10 : 1;

      /* Subtle mouse repulsion */
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const force = (80 - dist) / 80 * 0.4;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      /* Dampen velocity */
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;

      /* Wrap */
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      const a = p.alpha * fade * 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + a + ')';
      ctx.fill();
    });
    rafId = requestAnimationFrame(draw);
  };

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    clearTimeout(window._pResize);
    window._pResize = setTimeout(resize, 150);
  }, { passive: true });

  resize();
  rafId = requestAnimationFrame(draw);

  /* Pause when page hidden */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); rafId = null; }
    else { rafId = requestAnimationFrame(draw); }
  });
})();

/* ═══════════════════════════════════════════════
   6. SCROLL REVEAL
═══════════════════════════════════════════════ */
(function initReveal() {
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-fade, .reveal-left, .reveal-right, ' +
    '.info-card, .family-card, .contact-card, .sat-card, ' +
    '.interest-card, .address-card, .sakha-center-card, .section-header'
  );

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('visible'));
    return;
  }

  /* Stagger cards in grids */
  const grids = document.querySelectorAll(
    '.about-grid, .family-row, .contact-grid, .interests-grid, .sakha-orbit-wrapper'
  );
  grids.forEach(grid => {
    const cards = grid.querySelectorAll(
      '.info-card, .family-card, .contact-card, .sat-card, .interest-card'
    );
    cards.forEach((card, i) => {
      card.style.setProperty('--delay', `${i * 0.08}s`);
      card.classList.add('reveal-up');
    });
  });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );

  document.querySelectorAll(
    '.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .section-header'
  ).forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════════
   7. 3D TILT CARDS
   attachTiltToCard() is exposed on window so pages
   that render cards dynamically (Moments/Basketball/
   Tech) can wire up the same effect after insertion.
═══════════════════════════════════════════════ */
function attachTiltToCard(card) {
  if (!card || isTouch || prefersReducedMotion || card.dataset.tiltBound) return;
  card.dataset.tiltBound = 'true';

  const TILT_INTENSITY = 10; // degrees
  let bounds, raf;

  const onEnter = () => {
    bounds = card.getBoundingClientRect();
    card.style.transition = 'box-shadow 0.3s, border-color 0.3s';
  };

  const onMove = (e) => {
    if (!bounds) return;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;
      const dx = (e.clientX - cx) / (bounds.width / 2);
      const dy = (e.clientY - cy) / (bounds.height / 2);
      const rotX = -dy * TILT_INTENSITY;
      const rotY =  dx * TILT_INTENSITY;
      const glowX = ((e.clientX - bounds.left) / bounds.width) * 100;
      const glowY = ((e.clientY - bounds.top)  / bounds.height) * 100;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;

      /* Move glow to follow mouse */
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.backgroundImage = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(245,199,106,0.2) 0%, transparent 60%)`;
        glow.style.opacity = '1';
      }
    });
  };

  const onLeave = () => {
    if (raf) cancelAnimationFrame(raf);
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s';
    const glow = card.querySelector('.card-glow');
    if (glow) { glow.style.opacity = '0'; glow.style.backgroundImage = ''; }
    bounds = null;
  };

  card.addEventListener('mouseenter', onEnter);
  card.addEventListener('mousemove', onMove, { passive: true });
  card.addEventListener('mouseleave', onLeave);
}
window.attachTiltToCard = attachTiltToCard;

(function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(attachTiltToCard);
})();

/* ═══════════════════════════════════════════════
   8. HERO PORTRAIT — 3D MOUSE PARALLAX
═══════════════════════════════════════════════ */
(function initPortraitParallax() {
  if (isTouch || prefersReducedMotion) return;
  const wrapper = document.getElementById('hero-portrait');
  if (!wrapper) return;

  const hero = document.getElementById('hero');
  let raf;

  hero.addEventListener('mousemove', (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      wrapper.style.transform = `perspective(1000px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg) translateZ(10px)`;
    });
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    wrapper.style.transition = 'transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    setTimeout(() => wrapper.style.transition = '', 800);
  });
})();

/* ═══════════════════════════════════════════════
   9. PORTRAIT FLOATING PARTICLES
═══════════════════════════════════════════════ */
(function initPortraitParticles() {
  if (prefersReducedMotion) return;
  const container = document.getElementById('portrait-particles');
  if (!container) return;

  const count = isMobile ? 4 : 8;
  const colors = ['#F5C76A', '#C026D3', '#F43F5E', '#7C3AED'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 5 + 3;
    const angle = (i / count) * 360;
    const radius = 100 + Math.random() * 50;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = 3 + Math.random() * 4;
    const delay = -Math.random() * 6;

    /* Custom props consumed by the portrait-orbit keyframes so each
       particle actually orbits at its own angle/radius instead of
       collapsing onto the keyframes' default 0deg/120px path. */
    p.style.setProperty('--start-angle', angle + 'deg');
    p.style.setProperty('--r', radius + 'px');

    Object.assign(p.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size * 2}px ${color}`,
      top: '50%',
      left: '50%',
      transformOrigin: `${-radius}px 0`,
      animation: `portrait-orbit ${duration}s linear ${delay}s infinite`,
      opacity: '0.7',
    });
    p.style.transform = `rotate(${angle}deg) translateX(${radius}px)`;

    container.appendChild(p);
  }

  /* Inject keyframes */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes portrait-orbit {
      0%   { transform: rotate(var(--start-angle, 0deg)) translateX(var(--r, 120px)); opacity: 0.7; }
      50%  { opacity: 1; }
      100% { transform: rotate(calc(var(--start-angle, 0deg) + 360deg)) translateX(var(--r, 120px)); opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════════
   10. INTEREST PHOTO — PARALLAX ON SCROLL
═══════════════════════════════════════════════ */
(function initPhotoParallax() {
  if (prefersReducedMotion) return;
  const img = document.querySelector('.interest-card-photo .interest-photo');
  const card = document.querySelector('.interest-card-photo');
  if (!img || !card) return;

  const onScroll = () => {
    const rect = card.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
    const shift = (progress - 0.5) * 30;
    img.style.transform = `translateY(${shift}px) scale(1.06)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ═══════════════════════════════════════════════
   11. SMOOTH SCROLL (anchor links)
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('navbar')?.offsetHeight ?? 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  });
});

/* ═══════════════════════════════════════════════
   12. BACK TO TOP
═══════════════════════════════════════════════ */
document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
});

/* ═══════════════════════════════════════════════
   13. MAGNETIC BUTTONS
═══════════════════════════════════════════════ */
(function initMagnetic() {
  if (isTouch || prefersReducedMotion) return;

  const magnetEls = document.querySelectorAll('.hero-cta, .nav-print-btn, #back-to-top');
  const STRENGTH = 0.35;

  magnetEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ═══════════════════════════════════════════════
   14. SECTION BG COLOR SHIFTS ON SCROLL
═══════════════════════════════════════════════ */
(function initSectionColors() {
  if (prefersReducedMotion) return;
  const hero = document.getElementById('hero');
  if (!hero) return;

  const colors = [
    [91, 33, 182],   // purple (about)
    [192, 38, 211],  // magenta (sakha)
    [244, 63, 94],   // rose (interests)
    [91, 33, 182],   // purple (family)
    [192, 38, 211],  // magenta (contact)
  ];

  const sections = document.querySelectorAll('section:not(#hero)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = [...sections].indexOf(entry.target);
      if (idx < 0 || !colors[idx]) return;
      const [r, g, b] = colors[idx];
      document.body.style.setProperty(
        '--current-orb',
        `rgba(${r},${g},${b},0.08)`
      );
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => obs.observe(s));
})();

/* ═══════════════════════════════════════════════
   15. HERO NAME — character stagger on load
═══════════════════════════════════════════════ */
(function initNameReveal() {
  if (prefersReducedMotion) return;

  /* Name lines already animate via CSS animation on .hero-name-block.
     Here we trigger a subtle gold shimmer sweep across the surname
     once the entrance animation has settled. */
  setTimeout(() => {
    const nameLines = document.querySelectorAll('.name-line.name-last');
    nameLines.forEach(line => {
      line.style.backgroundSize = '200% 100%';
      line.classList.add('shimmer');
    });
  }, 2500);
})();

/* ═══════════════════════════════════════════════
   16. DYNAMIC CSS PROPERTY — viewport height fix (mobile)
═══════════════════════════════════════════════ */
(function initVH() {
  const setVH = () => {
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
  };
  setVH();
  window.addEventListener('resize', setVH, { passive: true });
})();

/* ═══════════════════════════════════════════════
   17. ACCESSIBILITY — Focus trap for mobile menu
═══════════════════════════════════════════════ */
(function initA11y() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const burger = document.getElementById('nav-hamburger');
      const menu = document.getElementById('nav-mobile-menu');
      if (menu?.classList.contains('open')) {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    }
  });
})();

/* ═══════════════════════════════════════════════
   18. PRINT — extra preparation
═══════════════════════════════════════════════ */
window.addEventListener('beforeprint', () => {
  document.body.classList.add('printing');
  // Ensure all reveal animations are complete for print
  document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right').forEach(el => {
    el.classList.add('visible');
  });
});
window.addEventListener('afterprint', () => {
  document.body.classList.remove('printing');
});

/* ═══════════════════════════════════════════════
   19. INTERSECTION — section-header stagger
═══════════════════════════════════════════════ */
(function initHeaderReveal() {
  if (prefersReducedMotion) return;
  const headers = document.querySelectorAll('.section-header');

  headers.forEach(header => {
    const children = header.children;
    Array.from(children).forEach((child, i) => {
      child.classList.add('reveal-up');
      child.style.setProperty('--delay', `${i * 0.12}s`);
    });
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal-up').forEach(el => el.classList.add('visible'));
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  headers.forEach(h => obs.observe(h));
})();

/* ═══════════════════════════════════════════════
   20. FAMILY CARD — TIMELINE LINE ANIMATION
═══════════════════════════════════════════════ */
(function initFamilyTimeline() {
  const lines = document.querySelectorAll('.fgl-line');

  if (prefersReducedMotion) {
    lines.forEach(l => l.classList.add('grown'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('grown');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  lines.forEach(l => obs.observe(l));
})();

/* ═══════════════════════════════════════════════
   22. PAGE TRANSITIONS — subtle fade between chapters
   Respects prefers-reduced-motion (handled globally in
   CSS). Browser back/forward still use normal navigation;
   the pageshow listener below just guards against a stale
   fade-out class surviving a mobile bfcache restore.
═══════════════════════════════════════════════ */
(function initPageTransitions() {
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.classList.add('page-enter-active');
  }));
  /* Clean up transition classes once the fade completes — keeps
     <body> free of any lingering transition-only state. */
  document.body.addEventListener('transitionend', function onEnd(e) {
    if (e.target !== document.body || e.propertyName !== 'opacity') return;
    document.body.classList.remove('page-enter', 'page-enter-active');
    document.body.removeEventListener('transitionend', onEnd);
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || link.target === '_blank' || !/^[^:]*\.html(?:[?#]|$)/.test(href)) return;

    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      document.body.classList.add('page-leaving');
      const delay = prefersReducedMotion ? 0 : 260;
      setTimeout(() => { window.location.href = href; }, delay);
    });
  });

  /* Mobile browsers often restore a page from the back-forward cache
     (bfcache) instead of reloading it when the user taps "back". If a
     page happened to get cached mid-fade (body.page-leaving, opacity:0
     — e.g. it was cached right as the timeout above fired navigation),
     that class comes back with it. With nothing around to remove it,
     the page stays stuck invisible — a "black screen" — until a manual
     reload. This runs on every pageshow, including bfcache restores,
     so the page is always guaranteed visible again. */
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-leaving', 'page-enter', 'page-enter-active');
  });
})();

/* ═══════════════════════════════════════════════
   23. PHOTO GALLERY + LIGHTBOX (reusable)
   Powers moments.html and the Basketball photo
   showcase. Call:
     renderPhotoGallery('#gallery-grid', myArray);
═══════════════════════════════════════════════ */
function renderPhotoGallery(containerSelector, items, opts) {
  opts = opts || {};
  const container = document.querySelector(containerSelector);
  if (!container || !Array.isArray(items) || !items.length) return;

  const frag = document.createDocumentFragment();
  items.forEach((item, i) => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-item';
    if (item.featured || (opts.featureEvery && i % opts.featureEvery === opts.featureEvery - 1)) {
      fig.classList.add('gallery-item-featured');
    }
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', 'View ' + (item.title || 'photo') + ' full screen');
    fig.dataset.index = i;

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title || 'Photo';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', function onErr() {
      this.removeEventListener('error', onErr);
      fig.classList.add('gallery-item-empty');
    }, { once: true });

    const cap = document.createElement('figcaption');
    cap.className = 'gallery-caption';
    cap.textContent = item.title || '';

    fig.append(img, cap);
    frag.appendChild(fig);
  });
  container.appendChild(frag);

  const figs = container.querySelectorAll('.gallery-item');
  if (prefersReducedMotion) {
    figs.forEach(f => f.classList.add('visible'));
  } else {
    figs.forEach((f, i) => f.style.setProperty('--delay', ((i % 6) * 0.07) + 's'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    figs.forEach(f => obs.observe(f));
  }

  if (!isTouch && !prefersReducedMotion) {
    figs.forEach(f => {
      f.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover', 'cursor-image'));
      f.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover', 'cursor-image'));
    });
  }

  initLightbox(container, items);
}

function initLightbox(container, items) {
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Photo viewer');
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Close photo viewer">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '<button class="lightbox-nav lightbox-prev" aria-label="Previous photo">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
      '</button>' +
      '<div class="lightbox-stage">' +
        '<img class="lightbox-img" alt="" />' +
        '<p class="lightbox-caption"></p>' +
      '</div>' +
      '<button class="lightbox-nav lightbox-next" aria-label="Next photo">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>';
    document.body.appendChild(lightbox);
  }

  const imgEl    = lightbox.querySelector('.lightbox-img');
  const capEl    = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn  = lightbox.querySelector('.lightbox-prev');
  const nextBtn  = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let lastFocused = null;

  const show = (i) => {
    currentIndex = (i + items.length) % items.length;
    const item = items[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.title || 'Photo';
    capEl.textContent = item.title || '';
  };
  const open = (i) => {
    lastFocused = document.activeElement;
    show(i);
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-lock');
    closeBtn.focus();
  };
  const close = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-lock');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  };

  container.addEventListener('click', (e) => {
    const fig = e.target.closest('.gallery-item');
    if (!fig || fig.classList.contains('gallery-item-empty')) return;
    open(parseInt(fig.dataset.index, 10));
  });
  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const fig = e.target.closest('.gallery-item');
    if (!fig || fig.classList.contains('gallery-item-empty')) return;
    e.preventDefault();
    open(parseInt(fig.dataset.index, 10));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  /* Swipe support (mobile) */
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) show(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
}

/* ═══════════════════════════════════════════════
   24. VIDEO SHOWCASE (reusable) — Basketball page
   Call: renderVideoShowcase('#video-grid', myVideos);
   Videos use preload="none" so nothing downloads
   until the person presses play.
═══════════════════════════════════════════════ */
function renderVideoShowcase(containerSelector, videos) {
  const container = document.querySelector(containerSelector);
  if (!container || !Array.isArray(videos) || !videos.length) return;

  const frag = document.createDocumentFragment();
  videos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.setProperty('--delay', ((i % 4) * 0.08) + 's');

    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'none';
    video.playsInline = true;
    video.setAttribute('aria-label', v.title || 'Basketball video');
    if (v.poster) video.poster = v.poster;
    const source = document.createElement('source');
    source.src = v.src;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.addEventListener('error', () => card.classList.add('video-card-empty'), { once: true, capture: true });

    const cap = document.createElement('p');
    cap.className = 'video-caption';
    cap.textContent = v.title || '';

    card.append(video, cap);
    frag.appendChild(card);
  });
  container.appendChild(frag);

  const cards = container.querySelectorAll('.video-card');
  if (prefersReducedMotion) {
    cards.forEach(c => c.classList.add('visible'));
  } else {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    cards.forEach(c => obs.observe(c));
  }
}

/* ═══════════════════════════════════════════════
   25. CARD GRID RENDERER (reusable)
   Powers the Tech page's "Currently Occupying My
   Brain", "Currently Exploring" and "Things I've
   Built" sections, and Basketball's stat cards.
   Call:
     renderCardGrid('#brain-grid', items, {cardClass:'brain-card'});
   Each item: { title, desc, tag, icon, glow }
═══════════════════════════════════════════════ */
function renderCardGrid(containerSelector, items, opts) {
  opts = opts || {};
  const container = document.querySelector(containerSelector);
  if (!container || !Array.isArray(items) || !items.length) return;

  const cardClass = opts.cardClass || 'brain-card';
  const frag = document.createDocumentFragment();

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = cardClass + ' tilt-card';
    card.setAttribute('data-tilt', '');
    card.style.setProperty('--delay', ((i % 6) * 0.06) + 's');

    const glow = document.createElement('div');
    glow.className = 'card-glow' + (item.glow ? ' card-glow-' + item.glow : '');
    card.appendChild(glow);

    if (item.icon) {
      const icon = document.createElement('span');
      icon.className = 'gc-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = item.icon;
      card.appendChild(icon);
    }

    const title = document.createElement('span');
    title.className = 'gc-title';
    title.textContent = item.title || '';
    card.appendChild(title);

    if (item.desc) {
      const desc = document.createElement('span');
      desc.className = 'gc-desc';
      desc.textContent = item.desc;
      card.appendChild(desc);
    }

    if (item.tag) {
      const tag = document.createElement('span');
      tag.className = 'gc-tag';
      tag.textContent = item.tag;
      card.appendChild(tag);
    }

    frag.appendChild(card);
  });
  container.appendChild(frag);

  container.querySelectorAll('.tilt-card').forEach(attachTiltToCard);

  const cards = container.querySelectorAll('.' + cardClass);
  if (prefersReducedMotion) {
    cards.forEach(c => c.classList.add('visible'));
  } else {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    cards.forEach(c => obs.observe(c));
  }
}

/* ═══════════════════════════════════════════════
   26. TECH TIMELINE — scroll-driven reveal
═══════════════════════════════════════════════ */
(function initTechTimeline() {
  const items = document.querySelectorAll('.tt-item');
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach(i => i.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.2 });
  items.forEach(i => obs.observe(i));
})();

/* ═══════════════════════════════════════════════
   27. FLOATING CODE PARTICLES — Tech page decoration
   Lightweight, decorative, reduced/removed on mobile
   and under reduced-motion.
═══════════════════════════════════════════════ */
(function initCodeParticles() {
  const container = document.getElementById('code-particles');
  if (!container || prefersReducedMotion) return;

  const symbols = ['{ }', '</>', '=>', '( )', '[ ]', '&&', '::', '#!'];
  const count = isMobile ? 0 : 10;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'code-particle';
    el.textContent = symbols[i % symbols.length];
    el.style.left = Math.random() * 100 + '%';
    el.style.setProperty('--dur', (10 + Math.random() * 12) + 's');
    el.style.setProperty('--delay', (-Math.random() * 12) + 's');
    el.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    container.appendChild(el);
  }
})();

/* ═══════════════════════════════════════════════
   28. "OOPS, BUT MAKE IT REAL LIFE" — interactive cards
   Hover reveals the tech explanation (desktop/mouse).
   Click/Enter toggles it too, so touch and keyboard
   users get the same experience.
═══════════════════════════════════════════════ */
(function initOopCards() {
  const cards = document.querySelectorAll('.oop-card');
  if (!cards.length) return;

  cards.forEach((card, i) => {
    card.style.setProperty('--delay', (i * 0.1) + 's');
    card.addEventListener('click', () => {
      const isOpen = card.classList.toggle('revealed');
      card.setAttribute('aria-expanded', String(isOpen));
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  cards.forEach(attachTiltToCard);

  if (prefersReducedMotion) {
    cards.forEach(c => c.classList.add('visible'));
  } else {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    cards.forEach(c => obs.observe(c));
  }
})();

/* ═══════════════════════════════════════════════
   29. "IF LIFE HAD CODE" — reveal on scroll
═══════════════════════════════════════════════ */
(function initCodeWindow() {
  const el = document.querySelector('.code-window');
  if (!el) return;

  if (prefersReducedMotion) { el.classList.add('visible'); return; }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  obs.observe(el);
})();

/* ═══════════════════════════════════════════════
   INIT LOG
═══════════════════════════════════════════════ */
console.log(
  '%c✦ Jinesh Jitendra Modi — Premium Marriage Biodata %c\n' +
  '%c  Designed with craft & care\n  jm_shines',
  'background:#5B21B6;color:#F5C76A;padding:4px 8px;border-radius:4px 4px 0 0;font-weight:bold',
  '',
  'color:#C026D3;font-style:italic'
);