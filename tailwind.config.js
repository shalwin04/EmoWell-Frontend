/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#EAE5D6",
        secondary: "#C1B98E",
        beige: "#F6F0E0",
        carmin: "##B23A33",
        sand: "#E3C9B0",
        burgundy: "#402522",
        pFont: "#3E1307",
      },
      fontFamily: {
        sans: ["Inter var", "Inter", "sans-serif"],
        playItalic: ["Playfair-Italic", "sans-serif"],
        playReg: ["Playfair-Regular", "sans-serif"],
        playBold: ["Playfair-Bold"],
        pItalic: ["Poppins-Italic"],
        pRegular: ["Poppins-Regular"],
        pSemiBold: ["Poppins-SemiBold"],
        pLight: ["Poppins-Light"],
      },
    },
  },
  plugins: [],
};
