// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // untuk expo-router
    "./components/**/*.{js,ts,jsx,tsx}", // kalau ada custom komponen
    "./screens/**/*.{js,ts,jsx,tsx}", // optional
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
