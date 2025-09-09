
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f0f9f4",
          100: "#dcf2e4",
          200: "#b8e4c9",
          300: "#8fd3ac",
          400: "#65c08e",
          500: "#44ac75",
          600: "#2e8f60",
          700: "#24744f",
          800: "#1e5b40",
          900: "#184833"
        },
        soil: {
          50: "#f7f6f3",
          100: "#eeeae1",
          200: "#d9cfbf",
          300: "#c2b194",
          400: "#a88f6d",
          500: "#8b7254",
          600: "#705a42",
          700: "#594835",
          800: "#46392a",
          900: "#382e22"
        },
        sky: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b9ddff",
          300: "#8ec8ff",
          400: "#5fb0ff",
          500: "#3a99ff",
          600: "#217be6",
          700: "#1a60b4",
          800: "#164c8f",
          900: "#143e74"
        }
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)",
        ring: "0 0 0 6px rgba(46, 143, 96, 0.12)"
      },
      borderRadius: {
        '2xl': "1.25rem"
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)'
      }
    },
  },
  plugins: [],
}
