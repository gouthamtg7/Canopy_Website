/** @type {import('tailwindcss').Config} */
// Every colour is a CSS variable (see src/index.css) derived from the product UI's warm-paper palette,
// with a dark variant. Legacy token names (paper/ink/accent/border*) map onto the same variables so
// older pages re-skin without edits.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        sunk: v('sunk'),
        line: v('line'),
        fg: { DEFAULT: v('ink'), 2: v('ink-2'), 3: v('ink-3') },
        brand: { DEFAULT: v('accent'), strong: v('accent-strong'), soft: v('accent-soft') },
        sage: v('sage'),
        clay: v('clay'),
        plum: v('plum'),
        // legacy names
        paper: { light: v('bg'), dark: v('bg'), cardLight: v('surface'), cardDark: v('surface'), subtleLight: v('sunk'), subtleDark: v('sunk') },
        ink: { light: v('ink'), dark: v('ink'), mutedLight: v('ink-2'), mutedDark: v('ink-2'), faintLight: v('ink-3'), faintDark: v('ink-3') },
        accent: {
          blue: v('accent'), blueHover: v('accent-strong'), blueSoft: v('accent-soft'), blueSoftDark: v('accent-soft'),
          green: v('sage'), greenSoft: v('sage-soft'), greenSoftDark: v('sage-soft'),
          red: v('clay'), redSoft: v('clay-soft'), redSoftDark: v('clay-soft'),
          amber: v('clay'), amberSoft: v('clay-soft'), amberSoftDark: v('clay-soft'),
        },
        borderLight: v('line'),
        borderDark: v('line'),
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI Variable Text"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI Variable Display"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', '"Cascadia Mono"', '"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 1px rgba(40,35,20,.04), 0 1px 3px rgba(40,35,20,.06)',
        elevated: '0 1px 2px rgba(40,35,20,.05), 0 4px 10px rgba(40,35,20,.07), 0 12px 28px rgba(40,35,20,.08)',
        float: '0 2px 4px rgba(40,35,20,.05), 0 12px 24px rgba(40,35,20,.08), 0 40px 80px -20px rgba(40,35,20,.22)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.36, 0.64, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      maxWidth: { page: '72rem' },
    },
  },
  plugins: [],
};
