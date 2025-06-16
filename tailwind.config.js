/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}', '!./node_modules/**/*'],
  theme: {
    extend: {
      colors: {
        'background-gray': '#43454C',
      },
    },
  },
  plugins: [],
};
