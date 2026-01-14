/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // Essencial para o script de tema que revisamos no layout.tsx
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}', // Importante para o processamento de arquivos MDX
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        // Certifique-se de que a variável condiz com o definido no next/font
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e1e9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        surface: {
          light: '#ffffff',
          dark: '#020617', // Slate 950, excelente para telas OLED
          card: {
            light: '#f8fafc',
            dark: '#0f172a',
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { transform: 'translateY(20px)', opacity: '0', filter: 'blur(5px)' },
          '100%': { transform: 'translateY(0)', opacity: '1', filter: 'blur(0)' },
        },
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        reveal: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-gradient': 'gradientMove 8s linear infinite',
      },
      backgroundImage: {
        // Útil para criar o fundo pontilhado (dot matrix) comum em dashboards de dados
        'grid-pattern': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '75ch', // Ideal para legibilidade de textos técnicos
            color: theme('colors.slate.600'),
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-links': theme('colors.blue.600'),
            '--tw-prose-code': theme('colors.blue.700'),
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
            '--tw-prose-code': theme('colors.blue.400'),
            code: {
              backgroundColor: theme('colors.slate.800'),
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
