/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'special-pink': '#B51F98',
        'dark-purple': '#3A1E63',
        'link' : '#f9f9f9',
        'brick-purple' : '#000324',
        'hero-background': '#1E1E1E',
        'special-background': '#120628',
        'grid-background': '#140841',
        'icon-background': '#8D1730',
        'testimonial-background': 'rgba(58, 30, 99, 0.4)',
        // 'big-testimonial': 'linear-gradient(116.01deg, #B51F98 -6.29%, #80150E 50.46%, #932119 98.29%)'
      }
    },
  },
  plugins: [],
}