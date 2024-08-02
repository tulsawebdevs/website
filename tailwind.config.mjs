/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx,ts,tsx,astro}',
    './components/**/*.{js,jsx,ts,tsx,astro}',
    './app/**/*.{js,jsx,ts,tsx,astro}',
    './src/**/*.{js,jsx,ts,tsx,astro}',
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
      transitionDuration: {
        3000: '3000ms',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'grow-shrink': {
          '0%': {
            scale: '25%',
          },
          '100%': {
            scale: '200%',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1.5s ease-in',
        'grow-shrink': 'grow-shrink 1s infinite',
      },
    },
  },
  plugins: [animate],
};
