/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'black': '#0B0B0B',
        'violet': '#850761',
        'white': "#fff",
        'input': '#181818',
        'sencondary': '#C7C5C5'
      },
      boxShadow: {
        'sha': ' inner  35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
