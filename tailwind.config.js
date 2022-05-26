module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-blue-primary": "#2323D5",
        "my-green-primary": "#68B865",
      },
      fontSize: {
        myheader1: [
          "40px",
          {
            lineHeight: "50px",
          },
        ],
        myheader2: ["35px"],
      },
      transitionProperty: {
        height: "height",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
