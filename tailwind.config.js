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
        // "beth-ellen": ['"Beth Ellen"', "cursive"],
        // martin: ["MARTIN", "sans-serif"],
      },
      backgroundImage: {
        // "tools-sm-es": "url('/images/tools-sm-es.svg')",
        // "tools-lg-es": "url('/images/tools-lg-es.svg')",
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
