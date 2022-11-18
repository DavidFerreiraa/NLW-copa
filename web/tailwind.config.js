/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif', //Default font will be Roboto.
      },
      colors: {
        nlw: {
          900: '#121214',
        }
      }
    },
  },
  plugins: [],
}
