// Decorative, always-running motion starts once someone is actually here (first interaction, or after a few
// seconds), so an unattended page load stays idle. Adds `motion-on` to <html>.
export function startMotionWhenEngaged() {
  const root = document.documentElement;
  const events = ['pointermove', 'pointerdown', 'scroll', 'keydown', 'touchstart'];
  const on = () => { root.classList.add('motion-on'); events.forEach((e) => window.removeEventListener(e, on)); clearTimeout(t); };
  const t = setTimeout(on, 6000);
  events.forEach((e) => window.addEventListener(e, on, { passive: true }));
}
