/* One orchestrated moment: the name settles in on load, then nothing else moves
   except the site ticker. Everything degrades to static if JS or motion is off. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

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
