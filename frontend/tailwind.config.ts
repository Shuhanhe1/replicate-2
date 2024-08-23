import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbebfe',
          200: '#bfddfe',
          300: '#94c8fc',
          400: '#61a9f9',
          500: '#3c87f5',
          600: '#2669ea',
          700: '#1e54d7',
          800: '#1e42a8',
          900: '#1f3d89',
          950: '#172754',
        },
        secondary: {
          50: '#e9f6ff',
          100: '#d7edff',
          200: '#b8dcff',
          300: '#8dc3ff',
          400: '#609cff',
          500: '#3c75ff',
          600: '#1a49ff',
          700: '#1e47f3',
          800: '#1035c3',
          900: '#173598',
          950: '#0e1e58',
        },
        'burning-orange': {
          50: '#fff3ed',
          100: '#ffe4d4',
          200: '#ffc4a8',
          300: '#ff9c71',
          400: '#ff6b3d',
          500: '#fe3f11',
          600: '#ef2607',
          700: '#c61708',
          800: '#9d150f',
          900: '#7e1510',
          950: '#440606',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
