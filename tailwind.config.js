/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors:{
        primary:"rgb(var(--primary))",
        secondary:"rgba(var(--secondary))",
        background:"rgb(var(--background))",
      }
    },
  },
  plugins: [],
}