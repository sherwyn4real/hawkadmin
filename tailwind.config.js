/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors:{
        primary:{
          'DEFAULT': '#4D47C3',
          '50': '#EDEAF8',
          '100': '#D2C6EF',
          '200': '#A790E0',
          '300': '#7D5AD1',
          '400': '#5233C2',
          '500': '#4D47C3',
          '600': '#3B2F8F',
          '700': '#2A216B',
          '800': '#191447',
          '900': '#080823'
        }
      }
    },
  },
  plugins: [],
}
