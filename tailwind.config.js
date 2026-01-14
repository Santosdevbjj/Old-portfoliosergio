/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        // Injetando Inter via variável do Next.js e JetBrains para o lado técnico
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e1e9ff',
          500: '#3b82f6', // Primary Data Blue
          600: '#2563eb',
          700: '#1d4ed8',
        },
        surface: {
          light: '#ffffff',
          dark: '#020617', // Slate-950
          card: {
            light: '#f8fafc', 
            dark: '#0f172a',  
          }
        },
      },
      keyframes: {
        fadeIn: { 
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' } 
        },
        reveal: {
          '0%': { transform: 'translateY(20px)', opacity: '0', filter: 'blur(5px)' },
          '100%': { transform: 'translateY(0)', opacity: '1', filter: 'blur(0)' },
        },
        gradientMove: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        reveal: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-gradient': 'gradientMove 8s linear infinite', // Sincronizado com globals.css
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, currentColor 1px, transparent 1px)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: theme('colors.slate.600'),
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-links': theme('colors.blue.600'),
            '--tw-prose-bold': theme('colors.slate.900'),
            '--tw-prose-code': theme('colors.blue.700'),
            '--tw-prose-pre-bg': theme('colors.slate.50'),
            code: {
              fontWeight: '600',
              backgroundColor: theme('colors.slate.100'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.375rem',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
        invert: {
          css: {
            color: theme('colors.slate.400'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.blue.400'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-code': theme('colors.blue.400'),
            '--tw-prose-pre-bg': 'rgba(15, 23, 42, 0.5)',
            code: {
              backgroundColor: theme('colors.slate.800'),
              color: theme('colors.blue.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};
