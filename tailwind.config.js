/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './dictionaries/**/*.{json}',
    './mdx/**/*.{md,mdx}', // artigos/posts em MDX/Markdown
  ],
  safelist: [
    // garante que variantes de prose não sejam purgadas
    'prose',
    'prose-technical',
    'dark:prose-darkTechnical',
  ],
  theme: {
    extend: {
      /* Breakpoints extras */
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },

      /* Tipografia base */
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },

      /* Paleta de cores (padronizada com Slate/Zinc no dark) */
      colors: {
        primary: { light: '#7f5af0', DEFAULT: '#7f5af0', dark: '#5a3db1' },
        accent: { light: '#f0a500', DEFAULT: '#f0a500', dark: '#b18300' },
        secondary: { light: '#ff61dc', DEFAULT: '#ff61dc', dark: '#b03f99' },
        brand: { light: '#6366f1', DEFAULT: '#4f46e5', dark: '#3730a3' },
        surface: {
          light: '#ffffff',
          dark: '#0f172a', // slate-950 vibe
        },
        border: {
          light: '#e5e7eb', // gray-200
          dark: '#334155',  // slate-700
        },
      },

      /* Container padrão com padding consistente */
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '2rem',
        },
      },

      /* Radius e sombras suaves */
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.10)',
      },

      /* Animações utilitárias */
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        textGradient: {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
        textGradient: 'textGradient 5s ease infinite',
      },

      /* Tema de tipografia técnico (light + dark) */
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
              backgroundColor: theme('colors.slate.900'),
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
              backgroundColor: theme('colors.slate.800'), // fundo mais suave
              color: theme('colors.pink.400'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: theme('colors.slate.800'), // fundo mais suave
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
