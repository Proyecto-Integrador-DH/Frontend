/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa': '#F411CF',
        'precio': '#872BFF',
        'foto': '296px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

