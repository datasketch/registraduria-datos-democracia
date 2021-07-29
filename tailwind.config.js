module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./layouts/**/*.html"],
    safelist: ["nav--active", "menu-icon--active"],
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
        "color-white-2": "#F7F8F9",
        "color-orange": "#EB5D0B",
        "color-bg": "#EDEEF0",
        "color-light": "#00B0AC",
        "color-blue-dark": "#EAEEF1",
        "color-datasketch": "#00223e",
      },
      fontFamily: {
        "soberana-sans": ['"Soberana Sans"'],
      },
      backgroundImage: {
        "banner-home-lg": "url(/images/home/banner-lg.png)",
        "banner-home-sm": "url(/images/home/banner-sm.png)",
        "bg-footer-sm": "url(/images/footer-x1.png)",
        "bg-footer-lg": "url(/images/footer-x2.png)",
        "bg-banner-electoral-sm":
          "url(/images/siscrimel/criminalidad-electoral/banner-criminalidad-electoral.png)",
        "bg-lines": "url(/images/bg-lines.svg)",
        "bg-lines-dark": "url(/images/bg-lines-dark.svg)",
        "bg-banner-datos-sm":
          "url(/images/siscrimel/explora-datos/banner-explora-datos.jpg)",
        "footer-sm": "url(/images/footer-x1.png)",
        "footer-lg": "url(/images/footer-x2.png)",
        "siscrimel-bg": "url(/images/home/siscrimel.svg)",
        "mechanism-bg": "url(/images/home/mechanism.svg)",
        "quienes-somos-bg":
          "url(/images/siscrimel/quienes-somos/banner-quienes-somos-desktop.png)",
        "delitos-bg":
          "url(/images/siscrimel/quienes-somos/delitos-irregularidades.jpg)",
        "variables-bg-sm":
          "url(/images/siscrimel/quienes-somos/banner-variables-phone.png)",
        "variables-bg-lg":
          "url(/images/siscrimel/quienes-somos/banner-variables-phone.png)",
        "metodologia-bg":
          "url(/images/siscrimel/explora-datos/metodologia.svg)",
        "biblioteca-recursos-bg":
          "url(/images/biblioteca-recursos/banner-biblioteca.jpg)",
        dropdown: "url(/images/bg-dropdown.svg)",
        "bg-informe": "url(/images/bg-informe.svg)",
        "bg-blue-light":
          "url(/images/siscrimel/preguntas-frecuentes/blue-light.svg)",
        "bg-blue-dark": "url(/images/bg-blue-dark.svg)",
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
