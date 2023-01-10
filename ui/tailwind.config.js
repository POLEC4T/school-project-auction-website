/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'gowun': ['Gowun Batang', 'serif'],
      'outfit': ['Outfit', 'sans-serif'],
      'chivo': ['Chivo', 'sans-serif']
    },
    backgroundSize: {
        '100': '100%',
        '140': '140%'
    },
    extend:{
        height: {
            '102': '28rem'
        },
        boxShadow: {
            'base': '-4px 4px 4px 0px'
        }
    }
  },
  plugins: [],
}
