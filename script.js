/* =========================
   SY1KA — script.js (v2.0)
   Responsibilities:
   - Burger menu
   - Typing effect
   - GSAP scroll animations
   - Magnetic cursor (desktop only)
   - 3D tilt on work cards (desktop)
   - Contact form simple handling (placeholder)
   - IntersectionObserver fallback for reveal
   ========================= */

(() => {
  // Helpers
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  /* ================= BURGER MENU ================= */
  const burger = qs('#burger');
  const navLinks = qs('#nav-links');
  burger && burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  /* Close menu on link click (mobile) */
  qsa('.nav-link').forEach(a => a.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    }
  }));

  /* ================ TYPING EFFECT ================= */
  const typingEl = qs('#typing');
  const words = ['впечатляют','продают','выделяются','конвертируют'];
  let ti = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[ti];
    if (!deleting) {
      typingEl.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(tick, 1400); return; }
    } else {
      typingEl.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ti = (ti + 1) % words.length; setTimeout(tick, 300); return; }
    }
    setTimeout(tick, deleting ? 50 : 80);
  }
  setTimeout(tick, 700);

  /* ================= GSAP Animations ================= */
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Intro fade in
    gsap.from('.hero-left > *', {
      y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: '.hero', start: 'top 90%' }
    });

    // Floating cards
    gsap.to('.card-a', { y: -10, repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" });
    gsap.to('.card-b', { y: -14, repeat: -1, yoyo: true, duration: 3.4, ease: "sine.inOut", delay: 0.2 });
    gsap.to('.card-c', { y: -8, repeat: -1, yoyo: true, duration: 2.8, ease: "sine.inOut", delay: 0.6 });

    // Reveal sections
    qsa('.work-card, .card.tech, .contact-left, .contact-form').forEach(el => {
      gsap.from(el, {
        y: 24, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: {
          trigger: el, start: 'top 92%', toggleActions: 'play none none none'
        }
      });
    });

    // Stagger works
    gsap.from('.works-grid > .work-card', {
      y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: {
        trigger: '.works-grid', start: 'top 92%'
      }
    });

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 40) header.style.boxShadow = '0 8px 30px rgba(2,6,23,0.6)';
      else header.style.boxShadow = 'none';
    });
  } // if gsap

  /* ================= MAGNETIC CURSOR (desktop) ================= */
  const cursor = qs('#cursor');
  if (!isTouch && cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    // interactive elements that react
    const magnets = qsa('.btn, .nav-link, .tg-btn, .work-card');
    magnets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.6)');
      el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
    });

    // Magnetic attraction (subtle)
    document.addEventListener('mousemove', e => {
      magnets.forEach(el => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const max = 120; // influence radius
        if (dist < max) {
          const tx = (dx / max) * 8;
          const ty = (dy / max) * 6;
          el.style.transform = `translate(${tx}px, ${ty}px)`;
        } else {
          el.style.transform = '';
        }
      });
    });
  }

  /* ================= 3D TILT FOR WORK CARDS (desktop only) ================= */
  if (!isTouch) {
    qsa('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rotateX = (py - 0.5) * 10; // tilt amount
        const rotateY = (px - 0.5) * -10;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ================= IntersectionObserver (fallback reveal) ================= */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.08 });

  qsa('.work-card, .card.tech, .contact-left, .contact-form').forEach(el => io.observe(el));

  /* ================= CONTACT FORM (simple) ================= */
  const form = qs('#project-form');
  const status = qs('#form-status');
  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message')
    };

    // Simple UI feedback
    status.textContent = 'Отправка...';
    try {
      // OPTIONAL: integrate with your Telegram BOT / backend
      // Example placeholder: send to some API endpoint
      // await fetch('/api/send', { method:'POST', body: JSON.stringify(payload), headers:{'Content-Type':'application/json'} });

      // Simulate success
      await new Promise(r => setTimeout(r, 800));
      status.textContent = 'Спасибо! Я свяжусь с вами в Telegram.';
      form.reset();
    } catch (err) {
      status.textContent = 'Ошибка отправки — попробуйте позже.';
    }
  });

  /* ================= Performance: unload heavy effects on small screens ================= */
  function adjustForSize() {
    if (window.innerWidth < 520) {
      // remove transforms applied by magnetic effect
      qsa('.btn, .work-card, .nav-link').forEach(el => el.style.transform = '');
      if (cursor) cursor.style.display = 'none';
    } else {
      if (cursor) cursor.style.display = '';
    }
  }
  adjustForSize();
  window.addEventListener('resize', adjustForSize);

})();


⸻

assets/img/work1.svg

<!-- assets/img/work1.svg — аккуратная svg-превью (замени на реальный скриншот при желании) -->
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g1" x1="0" x2="1">
      <stop offset="0" stop-color="#667eea"/>
      <stop offset="1" stop-color="#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" rx="16" fill="#0f1724"/>
  <rect x="60" y="60" width="1080" height="620" rx="12" fill="url(#g1)" opacity="0.12"/>
  <g transform="translate(100,120)" fill="#fff" opacity="0.95">
    <rect width="440" height="280" rx="8" fill="#1f2937" />
    <rect x="480" width="540" height="60" rx="6" fill="#111827"/>
    <rect x="480" y="84" width="540" height="36" rx="6" fill="#0b1220"/>
    <rect x="480" y="140" width="320" height="160" rx="8" fill="#0b1220"/>
  </g>
  <text x="120" y="740" fill="#9fb3d6" font-family="Inter,Arial" font-size="22">E-commerce — preview</text>
</svg>
