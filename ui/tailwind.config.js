/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
        'gowun': ['Gowun Batang', 'serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'chivo': ['Chivo', 'sans-serif'],
        'square': ['Square Peg', 'cursive']
    },
    backgroundSize: {
        '100': '100%',
        'article': 'auto 100%',
        'inverse': '100% auto',
        '140': '140%',
        '200': '200%'
    },
    extend:{
        height: {
            '102': '28rem'
        },
        boxShadow: {
            'base': '-4px 4px 4px 0px'
        },
        backgroundImage: {
            'hero': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./static/images/fond-login.jpg)',
            'banniere' : 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(./static/images/banniere-profil.jpg)',
            'intro': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./static/images/image_intro.jpg)',
            'vente': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./static/images/fond-vente.jpg)'
        },
        colors: {
            'goldenyellow':  '#D09C16'
        }
    }   

},
  plugins: [],
}
