/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        lightgray: "#d4d4d4",
        ghostwhite: "#f5f7ff",
      },
      spacing: {},
      fontFamily: {
        "noto-sans-jp": "'Noto Sans JP'",
      },
    },
    fontSize: {
      sm: "14px",
      "3xs": "10px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
