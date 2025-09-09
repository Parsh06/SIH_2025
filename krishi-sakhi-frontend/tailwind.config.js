
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
          50: "#f4fbf6",
          100: "#e6f7eb",
          200: "#c6ebd0",
          300: "#9bdcad",
          400: "#6fca87",
          500: "#4cb86a",
          600: "#379f57",
          700: "#2e7f47",
          800: "#255f37",
          900: "#1c4a2c"
        },
        soil: {
          50: "#f8f5f2",
          100: "#efe7df",
          200: "#dfcdbd",
          300: "#caa784",
          400: "#b2855b",
          500: "#966a43",
          600: "#7a5536",
          700: "#63452e",
          800: "#4e3826",
          900: "#3e2d1f"
        }
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        '2xl': "1.25rem"
      }
    },
  },
  plugins: [],
}
