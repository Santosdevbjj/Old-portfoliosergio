/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ativar dark mode via classe
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["'Inter Variable', sans-serif", "Inter", "sans-serif"],
      },
      fontSize: {
        xs: 'clamp(0.75rem, 0.7vw, 0.875rem)',
        sm: 'clamp(0.875rem, 0.9vw, 1rem)',
        base: 'clamp(1rem, 1vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1.2vw, 1.25rem)',
        xl: 'clamp(1.25rem, 1.5vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 2vw, 2rem)',
        '3xl': 'clamp(1.875rem, 2.5vw, 2.25rem)',
        '4xl': 'clamp(2.25rem, 3vw, 3rem)',
        '5xl': 'clamp(3rem, 4vw, 3.75rem)',
        '6xl': 'clamp(3.75rem, 5vw, 4.5rem)',
      },
      colors: {
        primary: {
          light: "#7f5af0",
          DEFAULT: "#7f5af0",
          dark: "#5a3db1",
        },
        accent: {
          light: "#f0a500",
          DEFAULT: "#f0a500",
          dark: "#b18300",
        },
        secondary: {
          light: "#ff61dc",
          DEFAULT: "#ff61dc",
          dark: "#b03f99",
        },
      },
      keyframes: {
        textGradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        gradientBG: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        textGradient: "textGradient 5s ease infinite",
        gradientBG: "gradientBG 15s ease infinite",
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'all': 'all',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
