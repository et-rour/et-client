module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-blue-primary": "#2423CA",
        "my-blue-primary-hover": "#4242ed",
        "my-green-primary": "#78AC75",
        "my-celest": "#16AFED",
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
  variants: {
    extend: {
      visibility: ['group-hover'],
      height: ['group-hover'],
    }
  },
  plugins: [],
};
