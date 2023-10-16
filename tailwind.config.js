/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1280px' // atau sesuaikan dengan nilai yang diinginkan
      }
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
      nunito: ['Nunito', 'sans-serif'],
      arab: ['Scheherazade New', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#03AA77',
        secondary: '#FDFDFD',
        alternative: '#0F543F',
        primary_dark: '#101d19'
      }
    }
  },
  plugins: []
}
