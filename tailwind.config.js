/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#5343af",
        lightgray: "#d5d5d5",
      },
      keyframes: {
        slide_up: {
          "0%": {
            opacity: 0,
            transform: "translateY(2rem)",
          },
          "50%": {
            opacity: 0.5,
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slide_up: "slide_up 0.7s ease-out",
      },
    },
  },
  plugins: [],
};
