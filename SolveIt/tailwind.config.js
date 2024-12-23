module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "360px", // Extra small
        sm: "640px", // Small (default)
        md: "768px", // Medium (default)
        lg: "1024px", // Large (default)
        xl: "1280px", // Extra large (default)
        "2xl": "1536px", // 2x extra large (default)
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
