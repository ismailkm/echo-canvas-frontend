/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        calm: {
          50: '#f9f7f4',
          100: '#f2ede8',
          200: '#e5dcd1',
          300: '#d8cbba',
          400: '#c9b5a3',
          500: '#b39c8c',
          600: '#8b7c6f',
          700: '#6b5d56',
          800: '#4d403d',
          900: '#3d3230',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: '18px',
      },
      lineHeight: {
        relaxed: '1.6',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
