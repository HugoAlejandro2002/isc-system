/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#17149A',
        'secondary': '#EAB816',
        'blue-2': '#5C68CE',
      },
      fontFamily: {
        'sans': ['Work Sans']
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

