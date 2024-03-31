const { blackA, mauve, violet } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '800px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    extend: {
      backgroundImage: {
        gradient: 'var(--gradient)',
      },
      colors: {
        'black-lighter': 'var(--black-lighter)',
        black: 'var(--black)',
        'black-light': 'var(--black-light)',
        orange: 'var(--orange)',
        black3: 'var(--black3)',
        pink: 'var(--pink)',
        ...blackA,
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
};
