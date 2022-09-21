/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ['Oleo Script', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
