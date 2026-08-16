/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#06080d',
          900: '#0b0e17',
          850: '#111625',
          800: '#182035',
        },
        brand: {
          500: '#6366f1',
          600: '#4f46e5',
          400: '#818cf8',
          300: '#a5b4fc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
