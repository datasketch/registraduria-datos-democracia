module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./layouts/**/*.html"],
    options: {},
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-color": "#0A4A83",
        "primary-color-light": "#04F6E8",
        "primary-color-dark": "#003057",
        "color-body": "#303C46",
        "color-white": "#fff",
      },
      fontFamily: {
        "soberana-sans": ['"Soberana Sans"'],
      },
      backgroundImage: {
        "bg-footer-sm": "url(/images/footer-x1.png)",
        "bg-footer-lg": "url(/images/footer-x2.png)",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  corePlugins: {
    container: false,
  },
};
