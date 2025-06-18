/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      padding: {
        '320': '320px',
      },
    },
  },
  variants: {
    extend: {
      padding: ['responsive'],
    },
  },
  plugins: [],
};
