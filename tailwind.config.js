/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './dictionaries/**/*.{json}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: { light: '#7f5af0', DEFAULT: '#7f5af0', dark: '#5a3db1' },
        accent: { light: '#f0a500', DEFAULT: '#f0a500', dark: '#b18300' },
        secondary: { light: '#ff61dc', DEFAULT: '#ff61dc', dark: '#b03f99' },
        brand: { light: '#6366f1', DEFAULT: '#4f46e5', dark: '#3730a3' },
      },
      typography: (theme) => ({
        technical: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.dark'),
                textDecoration: 'underline',
              },
            },
            h1: { fontWeight: '700', letterSpacing: '-0.02em', color: theme('colors.gray.900') },
            h2: { fontWeight: '600', letterSpacing: '-0.01em', color: theme('colors.gray.900') },
            h3: { fontWeight: '500', color: theme('colors.gray.800') },
            code: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.pink.600'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.DEFAULT'),
              color: theme('colors.gray.700'),
              fontStyle: 'italic',
            },
            strong: { color: theme('colors.gray.900') },
          },
        },
        darkTechnical: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.blue.400'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.blue.300'),
                textDecoration: 'underline',
              },
            },
            h1: { fontWeight: '700', letterSpacing: '-0.02em', color: theme('colors.gray.50') },
            h2: { fontWeight: '600', letterSpacing: '-0.01em', color: theme('colors.gray.100') },
            h3: { fontWeight: '500', color: theme('colors.gray.200') },
            code: {
              backgroundColor: theme('colors.gray.800'), // fundo mais suave
              color: theme('colors.pink.400'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'), // fundo mais suave
              color: theme('colors.gray.100'),
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            blockquote: {
              borderLeftColor: theme('colors.blue.400'),
              color: theme('colors.gray.300'),
              fontStyle: 'italic',
            },
            strong: { color: theme('colors.gray.50') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/container-queries'),
  ],
};
