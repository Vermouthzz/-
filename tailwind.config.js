/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: "rgb(var(--))",
      },
      textColor: {
        primary: "var(--title-color)",
      }
    },
  },
  plugins: [],
}

