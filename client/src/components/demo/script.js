// The guided walkthrough: an illustrative sample repo and the loop Understand → Change → Watch → Review.
// Every wording shown inside the mock mirrors the real viewer; the repo and numbers are a made-up sample.

export const REPO = {
  name: 'acme-shop',
  client: 'acme-web',
  server: 'acme-api',
  stories: 26,
  serverStories: 12,
  sidebar: [
    { folder: 'server/src/routes/orders', items: [
      { id: 'orders', route: 'POST /api/orders', fn: 'createOrder' },
      { id: 'order', route: 'GET /api/orders/:id', fn: 'getOrder' },
      { id: 'refund', route: 'POST /api/orders/:id/refund', fn: 'refundOrder' },
    ] },
    { folder: 'server/src/routes/auth', items: [
      { id: 'login', route: 'POST /api/login', fn: 'login' },
      { id: 'signup', route: 'POST /api/signup', fn: 'signup' },
    ] },
    { folder: 'server/src/routes/cart', items: [
      { id: 'cart', route: 'GET /api/cart', fn: 'getCart' },
      { id: 'cartadd', route: 'POST /api/cart/items', fn: 'addItem' },
    ] },
  ],
  chain: [
    { t: 'Checkout button', s: 'onClick · client/src/pages/Checkout.jsx' },
    { t: 'submitCheckout', s: 'client/src/pages/Checkout.jsx:41' },
    { t: 'POST /api/orders', s: 'route · acme-api', ai: true },
    { t: 'createOrder', s: 'server/src/routes/orders.js:24' },
    { t: 'calculateTotal', s: 'server/src/lib/pricing.js:8' },
    { t: 'Order.create', s: 'model · PostgreSQL' },
  ],
};

// Scene-space rectangles the camera frames (scene is 960 × 600).
export const CAMERAS = {
  system: { x: 330, y: 90, w: 300, h: 400 },
  flow: { x: 20, y: 20, w: 920, h: 390 },
  flowFn: { x: 20, y: 20, w: 560, h: 390 },
};

export const ASK_Q = 'Where is the order total calculated?';
export const EDIT_Q = 'Return 400 when the cart is empty in createOrder';

export const LIVE_TASKS = ['Find where orders are created', 'Return 400 for an empty cart', 'Run the order tests'];
export const LIVE_FEED = [
  { kind: 'read', text: 'server/src/routes/orders.js', now: 'Reading server/src/routes/orders.js' },
  { kind: 'read', text: 'server/src/lib/pricing.js', now: 'Reading server/src/lib/pricing.js' },
  { kind: 'edit', text: 'server/src/routes/orders.js', now: 'Editing server/src/routes/orders.js' },
  { kind: 'test', text: 'npm test -- orders', now: 'Running npm test -- orders' },
];

export const CHAPTERS = [
  { id: 'understand', label: 'Understand', hint: 'Mental model + what breaks' },
  { id: 'change', label: 'Change', hint: 'Ask AI or Edit' },
  { id: 'watch', label: 'Watch', hint: 'Live agent view' },
  { id: 'review', label: 'Review', hint: 'Changes on the map' },
];

const flow = { view: 'flow', sel: 'orders', camera: 'flow' };

export const STEPS = [
  {
    id: 'map', chapter: 'understand', duration: 4600, spot: 'canvas',
    title: 'Your repo, as a map.',
    body: 'Run one command in a JS/TS repo. Services, routes and the calls between them, drawn from the code on your machine.',
    base: { view: 'system', camera: 'system' },
    beats: [
      { at: 500, cursor: 'node-web' },
      { at: 1900, cursor: 'node-api' },
      { at: 3300, click: true },
      { at: 3500, set: { ...flow } },
    ],
  },
  {
    id: 'flow', chapter: 'understand', duration: 4400, spot: 'node-fn',
    title: 'Every route, traced.',
    body: 'Open a workflow and see what it really does, branch by branch, and where it is called from.',
    base: { ...flow },
    beats: [{ at: 400, cursor: ['side-orders', 'node-route'] }, { at: 1800, cursor: 'node-fn' }],
  },
  {
    id: 'blast', chapter: 'understand', duration: 6400, spot: 'panel',
    title: 'What breaks if I change this?',
    body: 'Before you touch a function, see who depends on it, across services, and how sure each link is.',
    base: { ...flow },
    beats: [
      { at: 400, cursor: 'node-fn' },
      { at: 1100, click: true },
      { at: 1250, set: { panel: 'node', camera: 'flowFn' } },
      { at: 2200, cursor: 'btn-blast' },
      { at: 2900, click: true },
      { at: 3050, set: { blast: true, toast: '3 affected: 2 direct, 1 indirect. 2 of them are drawn in this view.' } },
    ],
  },
  {
    id: 'mental', chapter: 'understand', duration: 6200, spot: 'panel',
    title: 'A mental model, start to end.',
    body: 'Pick where a story starts and ends. The real calls in your code join them; AI can fill a gap, and it is checked against the code.',
    base: { ...flow, panel: 'mental', camera: 'flowFn', mmMode: 'det', mmChain: 1 },
    beats: [
      { at: 250, cursor: 'btn-mental' },
      ...[2, 3, 4, 5, 6].map((n, i) => ({ at: 500 + i * 260, set: { mmChain: n } })),
      { at: 2700, cursor: 'mm-ai' },
      { at: 3400, click: true },
      { at: 3550, set: { mmMode: 'ai' } },
    ],
  },
  {
    id: 'ask', chapter: 'change', duration: 6600, spot: 'panel',
    title: 'Ask in plain words.',
    body: 'Answers come with places on the map you can click. It runs through your own Claude Code login.',
    base: { ...flow, panel: 'ask', camera: 'flowFn', ask: { mode: 'ask', typed: '' } },
    beats: [
      { at: 300, cursor: 'composer' },
      { at: 900, click: true },
      { at: 1100, type: { key: 'ask', text: 'Where is the order total calculated?' } },
      { at: 2700, cursor: 'send' },
      { at: 3200, click: true },
      { at: 3300, set: { ask: { sent: true } } },
      { at: 4300, set: { ask: { answered: true } } },
      { at: 4900, cursor: 'place-calc' },
    ],
  },
  {
    id: 'edit', chapter: 'change', duration: 7800, spot: 'panel',
    title: 'Or ask for a change.',
    body: 'Before anything is written you see what depends on it, then allow it once or for the session.',
    base: { ...flow, panel: 'ask', camera: 'flowFn', ask: { mode: 'ask', typed: '' } },
    beats: [
      { at: 300, cursor: 'tab-edit' },
      { at: 900, click: true },
      { at: 1000, set: { ask: { mode: 'edit' } } },
      { at: 1300, cursor: 'composer' },
      { at: 1500, type: { key: 'ask', text: 'Return 400 when the cart is empty in createOrder' } },
      { at: 3500, cursor: 'send' },
      { at: 3900, click: true },
      { at: 4000, set: { ask: { sent: true } } },
      { at: 4900, set: { ask: { answered: true } } },
      { at: 5700, cursor: 'allow' },
      { at: 6300, click: true },
      { at: 6400, set: { ask: { allowed: true } } },
    ],
  },
  {
    id: 'live', chapter: 'watch', duration: 6800, spot: 'canvas',
    title: 'Watch the agent, live.',
    body: 'See what your agent is reading and editing right now, lit up on the map as it works.',
    base: { ...flow, camera: 'flow', sideCollapsed: true, live: { n: 0, tasksDone: 0, glow: {} } },
    beats: [
      { at: 300, cursor: 'btn-live' },
      { at: 700, set: { live: { n: 1, glow: { createOrder: 'read' } } } },
      { at: 1900, set: { live: { n: 2, tasksDone: 1, glow: { createOrder: 'read', calculateTotal: 'read' } } } },
      { at: 3200, set: { live: { n: 3, glow: { createOrder: 'edit', calculateTotal: 'read' } }, added: true } },
      { at: 4600, set: { live: { n: 4, tasksDone: 2 } } },
      { at: 5900, set: { live: { tasksDone: 3, ended: true, glow: {} } } },
    ],
  },
  {
    id: 'changes', chapter: 'review', duration: 6200, spot: 'panel',
    title: 'Know what changed.',
    body: 'Every change shows up where it lives on the map, with what it could affect. Then go round again.',
    base: { ...flow, camera: 'flow', added: true, changed: true },
    beats: [
      { at: 500, cursor: 'btn-changes' },
      { at: 1300, click: true },
      { at: 1400, set: { panel: 'changes', camera: 'flowFn' } },
      { at: 2600, cursor: 'chg-fn' },
    ],
  },
];

// The IDE around the app in the VS Code view: the agent's chat and the terminal.
export const AGENT = {
  live: [
    { role: 'user', text: 'Return 400 when the cart is empty in createOrder' },
    { role: 'tool', text: 'Read server/src/routes/orders.js', at: 1 },
    { role: 'tool', text: 'Read server/src/lib/pricing.js', at: 2 },
    { role: 'tool', text: 'Edit server/src/routes/orders.js  +1', at: 3 },
    { role: 'tool', text: 'Bash npm test -- orders', at: 4 },
  ],
  changes: [
    { role: 'user', text: 'Return 400 when the cart is empty in createOrder' },
    { role: 'agent', text: 'Done. createOrder now returns 400 when items is empty; the order tests pass.' },
  ],
};

export const TERMINAL = [
  { k: 'cmd', t: 'canopy' },
  { k: 'out', t: '      services:   2 (acme-web, acme-api)' },
  { k: 'out', t: '      workflows:  26 (19 traced from real code, 7 guessed)' },
  { k: 'out', t: '* [6/6] Opening the map...' },
  { k: 'url', t: '      http://127.0.0.1:4000/' },
];
