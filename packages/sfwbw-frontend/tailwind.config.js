/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'accent-bg': 'var(--accent-bg)',
        normal: 'var(--text)',
        light: 'var(--text-light)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        code: 'var(--code)',
        preformatted: 'var(--preformatted)',
        disabled: 'var(--disabled)',
      },
    },
  },
  plugins: [],
};
