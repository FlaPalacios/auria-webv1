/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        negro: '#2B2B2B',
        blanco: '#F7F7F7',
        hueso: '#EBE8DD',
        uva: '#46395E',
        dorado: '#F2CD66',
      },
      fontFamily: {
        display: ['"Ananda Personal Use"', '"Playfair Display"', 'serif'],
        ui: ['"Coolvetica Rg Cond"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}