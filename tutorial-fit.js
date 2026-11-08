(function () {
  var isWin = !!document.querySelector('.win-desktop');
  var stageW = isWin ? 1220 : 1200;
  var gutter = isWin ? 32 : 16;
  var root = document.documentElement;
  var stage = document.querySelector('.motion-viewport');
  var banner = document.getElementById('explainer-banner');
  var home = banner ? banner.parentNode : null;
  var dock = null;

  function fit() {
    var avail = root.clientWidth - gutter;
    var s = Math.max(0.2, Math.min(1, avail / stageW));
    root.style.setProperty('--fit', s.toFixed(4));

    // Below ~70% the text inside the simulated desktop is too small to read,
    // so show the step explanation under the stage as normal page text.
    if (banner && stage) {
      var small = s < 0.7;
      if (small && !dock) {
        dock = document.createElement('div');
        dock.className = 'explainer-dock';
        dock.setAttribute('aria-live', 'polite');
        stage.parentNode.insertBefore(dock, stage.nextSibling);
        dock.appendChild(banner);
      } else if (!small && dock) {
        home.appendChild(banner);
        dock.remove();
        dock = null;
      }
    }
  }

  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);

  // Keep the active step pill visible when the pill row scrolls
  var pills = document.querySelectorAll('.step-pill');
  var mo = new MutationObserver(function () {
    var a = document.querySelector('.step-pill.active');
    if (a && a.parentNode.scrollWidth > a.parentNode.clientWidth) {
      a.parentNode.scrollTo({ left: a.offsetLeft - 12, behavior: 'smooth' });
    }
  });
  pills.forEach(function (p) { mo.observe(p, { attributes: true, attributeFilter: ['class'] }); });
})();
