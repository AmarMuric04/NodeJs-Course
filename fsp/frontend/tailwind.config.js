/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scrollRightHalf: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-291%)" },
        },
        scrollRightFull: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-147.5%)" },
        },
      },
      animation: {
        "scroll-right-half": "scrollRightHalf 10s linear infinite",
        "scroll-right-full": "scrollRightFull 20s linear infinite",
      },
    },
  },
  plugins: [],
};
