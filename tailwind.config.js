/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'gilroy-regular': ['Gilroy-Regular', 'sans-serif'],
        'gilroy-regular-italic': ['Gilroy-RegularItalic', 'sans-serif'],
        'gilroy-medium': ['Gilroy-Medium', 'sans-serif'],
        'gilroy-light': ['Gilroy-Light', 'sans-serif'],
        'gilroy-medium-italic': ['Gilroy-MediumItalic', 'sans-serif'],
        'gilroy-bold': ['Gilroy-Bold', 'sans-serif']
      },
      colors: {
        'kaitoke-green': {
          '50': '#edfff6',
          '100': '#d4ffec',
          '200': '#adffda',
          '300': '#6dffbe',
          '400': '#27ff9b',
          '500': '#00ec7c',
          '600': '#00c563',
          '700': '#009951',
          '800': '#037843',
          '900': '#044e2e',
          '950': '#00381e',
        },
        'green-pea': {
          '50': '#eefbf3',
          '100': '#d5f6e0',
          '200': '#aeecc5',
          '300': '#79dca5',
          '400': '#43c481',
          '500': '#20a967',
          '600': '#138852',
          '700': '#0f6d43',
          '800': '#10603d',
          '900': '#0d472f',
          '950': '#06281b',
        },
      }
    },
  },
  plugins: [],
}