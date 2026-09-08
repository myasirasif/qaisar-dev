/* One orchestrated moment: the name settles in on load, then nothing else moves
   except the site ticker. Everything degrades to static if JS or motion is off. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var lines = document.querySelectorAll('.hero__line');
  Array.prototype.forEach.call(lines, function (line, i) {
    line.animate(
      [
        { transform: 'translate3d(0, 0.32em, 0)', opacity: 0 },
        { transform: 'translate3d(0, 0, 0)', opacity: 1 }
      ],
      {
        duration: 700,
        delay: 90 + i * 110,
        easing: 'cubic-bezier(.16,.84,.32,1)',
        fill: 'backwards'
      }
    );
  });
})();

/* Mobile menu. The collapsed layout is gated on the data-js flag set here, so
   with scripting off the links stay visible in the bar instead of hiding behind
   a button that cannot open. */
(function () {
  var nav = document.querySelector('[data-nav]');
  var toggle = document.querySelector('[data-nav-toggle]');
  if (!nav || !toggle) return;

  var panel = document.getElementById(toggle.getAttribute('aria-controls'));
  if (!panel) return;

  var desktop = window.matchMedia('(min-width: 48rem)');

  function setOpen(open) {
    nav.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function close(refocus) {
    if (nav.getAttribute('data-open') !== 'true') return;
    setOpen(false);
    if (refocus) toggle.focus();
  }

  nav.setAttribute('data-js', '');
  setOpen(false);

  toggle.addEventListener('click', function () {
    setOpen(nav.getAttribute('data-open') !== 'true');
  });

  // A link jumps to a section, so the panel has done its job.
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) close(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close(true);
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) close(false);
  });

  // Widening past the breakpoint reveals the bar layout; drop the open state so
  // it is not left behind when the viewport narrows again.
  var onChange = function (e) { if (e.matches) close(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', onChange);
  else desktop.addListener(onChange);
})();
