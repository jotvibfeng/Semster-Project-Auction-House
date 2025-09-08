/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        "background-gray": "#43454C",
        "button-color": "#9eabcf",
        "register-button": "#6a7799",
        "hover-login": "#B7C7F3",
        "listing-button": "#C1BCBB",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      width: {
        custom: "50%",
      },
      height: {
        hcustom: "50%",
      },
    },
  },
  plugins: [],
};
