/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          dark: '#a07830',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          card: '#111111',
          border: '#1e1e1e',
          hover: '#161616',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
};
