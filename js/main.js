(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll
  var els = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('sfn-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sfn-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  var close = document.querySelector('.menu-close');
  if (toggle && menu && close) {
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) { close.focus(); } else { toggle.focus(); }
    };
    toggle.addEventListener('click', function () { setOpen(true); });
    close.addEventListener('click', function () { setOpen(false); });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { setOpen(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); }
    });
  }

  // Ambient hero film: only load on wider screens, never with reduced motion
  var heroVideo = document.querySelector('.hero-media video');
  if (heroVideo) {
    if (reduced || window.innerWidth < 900) {
      heroVideo.remove();
    } else {
      heroVideo.querySelectorAll('source[data-src]').forEach(function (s) {
        s.src = s.getAttribute('data-src');
      });
      heroVideo.load();
      heroVideo.addEventListener('playing', function () {
        heroVideo.classList.add('playing');
      });
      var p = heroVideo.play();
      if (p && p.catch) { p.catch(function () { heroVideo.remove(); }); }
    }
  }
})();
