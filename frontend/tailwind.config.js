/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-grey": "#f3f6f9",
        "sky-blue": "#009CFF",
        "dark-green": "#191c24",
        "sonic-silver": "#757575",
      },
      gridTemplateColumns: {
        "page-layout": "min-content minmax(0, 1fr)",
        "dashboard-div": "6fr 4fr",
        "dashboard-div-resp": "1fr",
      },
      screens: {
        xsm: "320px",
      },
    },
  },
  plugins: [],
};
