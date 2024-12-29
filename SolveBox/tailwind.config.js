module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        sm: "480px",

        md: "768px",
        lg: "1024px",

        xl: "1280px", // Laptops
        "3xl": "1536px", // Larger monitors

        // Extra-Large Screens
        "4xl": "1600px", // Wide desktop screens
        "5xl": "1920px", // Full HD resolution

        // Ultra-Wide Screens
        "6xl": "2560px", // Quad HD resolution
        "7xl": "3840px", // 4K resolution
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
