/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-brown': '#DBC8A3',
        'medium-brown': '#C7945A',
      },
    },
  },
  plugins: [],
  purge: {
    safelist: [
    ]
  },
};
