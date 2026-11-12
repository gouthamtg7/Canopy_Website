// Lets the hero (eager) talk to the demo (lazy-loaded). A request made before the demo loads is kept and replayed.
const listeners = new Set();
let pending = null;

export const demoBus = {
  go(chapter) {
    if (listeners.size) listeners.forEach((fn) => fn({ chapter }));
    else pending = { chapter };
  },
  listen(fn) {
    listeners.add(fn);
    if (pending) { const p = pending; pending = null; fn(p); }
    return () => listeners.delete(fn);
  },
};
