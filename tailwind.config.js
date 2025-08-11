/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}', '!./node_modules/**/*'],
  theme: {
    extend: {
      colors: {
        'background-gray': '#43454C',
        'button-color': '#9eabcf',
        'register-button': '#6a7799',
        'hover-login': '#B7C7F3',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
