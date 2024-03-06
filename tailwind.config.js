/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*.{html,js}'],
  theme: {
    extend: {
      colors: {
        resultPageBg : 'rgb(86 82 181)'
      },
      screens: {
        "mobile": {"min": "0px", "max": "600px"},
        "tablet": {"min": "601px", "max": "1200px"},
        "fablet" : {"min": "420px", "max": "600px"},
        "desktop": "1201px"
      },
      width: {
        '30p': '30%',
        '70p': '70%',
        '50p': '50%',
        '100p': '100%',
        '60p': '60%',
      },
      inset: {
        '0': '0',
        '100': '100%',
      },
      right: {
        '0': '0',
        '100': '100%',
      },
    },
  },
  plugins: [],
}
