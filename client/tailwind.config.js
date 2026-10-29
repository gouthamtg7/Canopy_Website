/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#FBF9F5',
          dark: '#121212',
          cardLight: '#FFFFFF',
          cardDark: '#1A1A1A',
          subtleLight: '#F3EFEA',
          subtleDark: '#222222',
        },
        ink: {
          light: '#1C1C1C',
          dark: '#E5E5E5',
          mutedLight: '#6B7280',
          mutedDark: '#9CA3AF',
          faintLight: '#9CA3AF',
          faintDark: '#6B7280',
        },
        accent: {
          blue: '#2563EB',
          blueHover: '#1D4ED8',
          blueSoft: '#EFF6FF',
          blueSoftDark: '#1E293B',
          green: '#16A34A',
          greenSoft: '#F0FDF4',
          greenSoftDark: '#143823',
          red: '#DC2626',
          redSoft: '#FEF2F2',
          redSoftDark: '#3B1818',
          amber: '#D97706',
          amberSoft: '#FFFBEB',
          amberSoftDark: '#362308',
        },
        borderLight: '#E5E0D8',
        borderDark: '#2A2A2A',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
