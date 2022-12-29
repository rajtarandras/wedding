/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#086A5A',
        },
        brand: {
          primary: "#FFFDD1"
        }
      }
    },
  },
  plugins: [],
};
