/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cinema: {
          50: '#f6f6f9',
          100: '#ececf2',
          200: '#d5d4e2',
          300: '#b1afcb',
          400: '#8b87c1',
          500: '#77758e',
          700: '#28283b',
          800: '#1b1b29',
          900: '#11111b',
          950: '#09090f'
        },
        brand: {
          400: '#ff6874',
          500: '#f43f5e',
          600: '#e11d48'
        }
      },
      boxShadow: {
        glow: '0 0 35px rgba(244,63,94,.22)',
        card: '0 2px 12px -2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: []
}
