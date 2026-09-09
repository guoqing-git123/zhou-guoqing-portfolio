// Vanilla adaptation of the supplied VariableProximity usage.
// Source Han Sans supports wght 250–900; it has no optical-size axis.
(() => {
  const container = document.querySelector('.hero');
  const letters = [...document.querySelectorAll('.name-letter')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const radius = 100, baseWeight = 700, peakWeight = 900;
  let frame = 0, pointer = null;
  function update() {
    frame = 0;
    letters.forEach(letter => {
      const rect = letter.getBoundingClientRect();
      const distance = pointer ? Math.hypot(pointer.x - rect.left - rect.width / 2, pointer.y - rect.top - rect.height / 2) : radius;
      const influence = reduced.matches ? 0 : Math.max(0, 1 - distance / radius);
      letter.style.fontVariationSettings = `'wght' ${Math.round(baseWeight + (peakWeight - baseWeight) * influence)}`;
    });
  }
  function reset() { pointer = null; cancelAnimationFrame(frame); update(); }
  container.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || reduced.matches) return;
    pointer = { x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });
  container.addEventListener('pointerleave', reset);
  window.addEventListener('blur', reset);
  window.addEventListener('scroll', reset, { passive: true });
  reduced.addEventListener('change', reset);
})();
