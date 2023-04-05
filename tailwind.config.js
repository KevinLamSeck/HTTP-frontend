const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          '50': '#f7f3ff',
          '100': '#efe9fe',
          '200': '#e2d6fe',
          '300': '#cbb5fd',
          '400': '#ad8bfa',
          '500': '#8b5cf6',
          '600': '#713aed',
          '700': '#5e28d9',
          '800': '#4e21b6',
          '900': '#421d95',
          '950': '#2a1065',
        },
      }
    },
  },
  plugins: [],
}
