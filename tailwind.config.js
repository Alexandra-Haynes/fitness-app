/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/assets/hero.jpg')",
        hero2: "url('/assets/hero2.jpg')",
        hero3: "url('/assets/hero3.jpg')",
      },
      colors: {
        primary: "#025464",
        secondary: "#E57C23",
        highlights: "#E8AA42",
        myWhite: "#F8F1F1",
      },
      animation: {
        "bounce-slow": "bounce 5s linear infinite",
        "slide-in-left": "slideInLeft 1s linear",
        "slide-in-right": "slideInRight 1s linear",
        "slide-in-top": "slideInTop 1s linear",
        "rocket-out": "slideOut 1s ease-in forwards",
      },
      keyframes: {
        slideInLeft: {
          "0%": {
            transform: "translateX(-100px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideInTop: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(20px)",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-1800px)",
            opacity: "0%"
            
          },
        },
      },
    },
  },
  plugins: [],
};
