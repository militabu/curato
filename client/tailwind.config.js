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
      },
      colors: {
        customPurple: '#8d8dda',
        customBlue: '#859df2',
        customOrange: '#edc68c',
        customTeal: '#09e0c6',
        customPink: '#bc768f', 
        customGreen: '#b2ef9b',
        customBuff: '#f5dd90',
        customYellow: '#ffee99'
      }
    },
  },
  plugins: [],
}
