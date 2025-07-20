/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"], // добавь все необходимые расширения
  theme: {
    extend: {
      colors: {
        primary: 'rgba(88, 204, 2, 1)', // цвет как у Duolingo
      },
    },
  },
  plugins: [],
}