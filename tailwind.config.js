module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'backgroound-dark': '#11171f',
        'font-gray': '#707070',
        'light-gray': '#333440',
        'dark-gray': '#1E242D',
        'dark-column': '#333D4D',
        'dark-data': '#232A34',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
}
