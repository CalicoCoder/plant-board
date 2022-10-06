/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-brown': '#DBC8A3',
        'medium-brown': '#C7945A',
      },
      transformOrigin: {
        'popover': 'var(--radix-popover-content-transform-origin)',
        'tooltip': 'var(--radix-tooltip-content-transform-origin)'
      },
      animation: {
        'scaleIn': 'scaleIn .2s ease-in-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { opacity: '0%', scale: 0 },
          '100%': { opacity: '100%', scale: 1 },
        }
      }
    },
  },
  plugins: [],
  purge: {
    safelist: [
    ]
  },
};
