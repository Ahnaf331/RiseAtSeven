/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './RiseAtSeven.jsx',
  ],
  theme: {
    extend: {
      colors: {
        mint:     '#b2f6e3',
        'g-50':   '#f7f7f7',
        'g-100':  '#efeeec',
        'g-150':  '#e9e9e9',
        'g-200':  '#bebebe',
        'g-300':  '#6a6a6a',
        'g-400':  '#282828',
        'g-500':  '#1f1f1f',
        'g-600':  '#1a1a1a',
        'g-800':  '#121212',
        'g-900':  '#111212',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight:    '-0.035em',
        tightish: '-0.025em',
      },
      lineHeight: {
        '0.9': '0.9',
      },
    },
  },
  plugins: [],
}
