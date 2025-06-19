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
    extend: {
      fontFamily: {
        modern: ["Inter", "Comic Sans MS"], // Add a modern font family
        poppins: ["Poppins_400Regular"],
        baloo: ["Baloo2_600SemiBold"],
      },
      fontSize: {
        "modern-lg": "1.875rem", // Large modern text size
        "modern-sm": "0.875rem", // Small modern text size
        "modern-base": "1.375rem", // Base modern text size
      },
      colors: {
        modernGray: "#333333", // Modern gray color
      },
    },
  },
  plugins: [],
};
