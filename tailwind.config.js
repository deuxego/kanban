/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        v1: '-5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)',
        v2: 'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)',
        v3: '-1px -1px 3px rgba(255,255,255,0.1), 2px 2px 6px rgba(0,0,0,0.8);'
      }
    }
  },
  plugins: []
};
