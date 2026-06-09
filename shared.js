/* ═══════════════════════════════════
   BIOVAGON · SHARED INTERACTIONS
   ═══════════════════════════════════ */
(function () {
  'use strict';

  /* ─── 1. COUNTER ANIMATION ─── */
  function animateCount(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    var target = +el.dataset.count;
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var dur = 1400;
    var start = performance.now();
    function tick(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.floor(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) animateCount(e.target); });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function (el) { countObs.observe(el); });

  /* ─── 2. GRID STAGGER ─── */
  var STAGGER = [
    { container: '.service-grid',   item: '.service-tile' },
    { container: '.features-grid',  item: '.feat' },
    { container: '.past-grid',      item: '.past-card' },
    { container: '.social-grid',    item: '.social-card' },
    { container: '.online-grid',    item: '.online-card' },
    { container: '.tile-grid',      item: '.tile' },
  ];

  STAGGER.forEach(function (def) {
    document.querySelectorAll(def.container).forEach(function (grid) {
      var items = Array.from(grid.querySelectorAll(def.item));
      if (!items.length) return;

      /* set initial hidden state */
      items.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.52s ease, transform 0.52s cubic-bezier(0.22,1,0.36,1), background 0.3s, box-shadow 0.25s';
      });

      var obs = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        items.forEach(function (el, i) {
          setTimeout(function () {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, i * 75);
        });
      }, { threshold: 0.08 });

      obs.observe(grid);
    });
  });

  /* ─── 3. HERO HEADLINE ENTRANCE ─── */
  var hero = document.querySelector('.page-hero h1, #home h1');
  if (hero) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(28px)';
    hero.style.transition = 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)';
    setTimeout(function () {
      hero.style.opacity = '1';
      hero.style.transform = 'none';
    }, 120);
  }

  /* ─── 4. MAGNETIC BUTTONS (subtle) ─── */
  document.querySelectorAll('.btn-acid, .btn-mag').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var dx = (e.clientX - r.left - r.width / 2) * 0.18;
      var dy = (e.clientY - r.top - r.height / 2) * 0.18;
      btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px) translate(-2px,-2px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

}());
