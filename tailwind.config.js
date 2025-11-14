/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#009FD8",
        "form-placeholder": "#878A99",
        "form-border": "#CED4DA",
        "form-gray": "#606060",
        "text-dark": "#24202C",
        "text-secondary": "#4E4B55",
        "bg-purple": "#F8F7FA",
        "divider-gray": "#E9EBEC",
        "sidebar-dark": "#1E1E2D",
        "main-bg": "#FCFCFE",
      },
      fontFamily: {
        roboto: ["Roboto", "-apple-system", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
