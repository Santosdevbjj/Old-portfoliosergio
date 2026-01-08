/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ativa modo dark via class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["'Inter Variable', sans-serif", "Inter", "sans-serif"],
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
