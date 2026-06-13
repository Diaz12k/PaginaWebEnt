/* ===========================
   TRAINING PROYECT – main.js
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky header shadow ---- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---- Mobile hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---- Hero line animation ---- */
  const heroLine = document.getElementById('hero-line');
  setTimeout(() => heroLine.classList.add('animated'), 200);

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .why-item, .testimonial-card, .stat, .section-title, .section-sub, .cta-title, .cta-sub'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---- Counter animation ---- */
  function animateCounter(el, target, suffix) {
    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statsBar = document.querySelector('.stats-bar');
  let countersRun = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersRun) {
      countersRun = true;
      document.querySelectorAll('.stat[data-count]').forEach((stat, idx) => {
        const count  = parseInt(stat.dataset.count, 10);
        const suffix = stat.dataset.suffix || '';
        const el     = stat.querySelector('.stat-num');
        animateCounter(el, count, suffix);
      });
    }
  }, { threshold: 0.3 });

  statsObserver.observe(statsBar);

  /* ---- Contact form ---- */
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('input, textarea').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    // Basic email check
    const emailField = form.querySelector('#email');
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simulate async send (replace with real fetch to your backend)
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Solicitar propuesta';
      btn.disabled = false;
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 5000);
    }, 1200);
  });

  // Remove error class on input
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });

  /* ---- Smooth active nav highlight ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + entry.target.id
            ? 'var(--purple)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));

});
