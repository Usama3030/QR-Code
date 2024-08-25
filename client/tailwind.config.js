// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grayTheme: {
          100: "#EFEFEF",
          200: "#F4F4F4",
          300: "#F7F7F7",
          400: "#FFFFFF",
          500: "#D3E0E9",
          600: "#DEE7EE",
          700: "#A5C1D6",
          800: "#98B4CA",
          900: "#5182AA",
        },
        signinButton: {
          100: "#FFFFFF",
          200: "#494F7F",
          300: "#3e4473",
        },
      },
    },
  },
  plugins: [],
};

// const colors = require("tailwindcss/colors");

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     colors: {
//       transparent: "transparent",
//       current: "currentColor",
//       grayTheme: {
//         100: "#EFEFEF",
//         200: "#F4F4F4",
//         300: "#F7F7F7",
//         400: "#EDEDED",
//         500: "#FFFFFF",
//         600: "#DEE7EE",
//         700: "#A5C1D6",
//         800: "#98B4CA",
//         900: "#5182AA",
//       },
//       signinButton: {
//         100: "#FFFFFF",
//         200: "#494F7F",
//         300: "#3e4473",
//       },
//       ...colors,
//     },
//     extend: {
//       minHeight: {
//         "screen-75": "75vh",
//       },
//       fontSize: {
//         55: "55rem",
//       },
//       opacity: {
//         80: ".8",
//       },
//       zIndex: {
//         2: 2,
//         3: 3,
//       },
//       inset: {
//         "-100": "-100%",
//         "-225-px": "-225px",
//         "-160-px": "-160px",
//         "-150-px": "-150px",
//         "-94-px": "-94px",
//         "-50-px": "-50px",
//         "-29-px": "-29px",
//         "-20-px": "-20px",
//         "25-px": "25px",
//         "40-px": "40px",
//         "95-px": "95px",
//         "145-px": "145px",
//         "195-px": "195px",
//         "210-px": "210px",
//         "260-px": "260px",
//       },
//       height: {
//         "95-px": "95px",
//         "70-px": "70px",
//         "350-px": "350px",
//         "500-px": "500px",
//         "600-px": "600px",
//       },
//       maxHeight: {
//         "860-px": "860px",
//       },
//       maxWidth: {
//         "100-px": "100px",
//         "120-px": "120px",
//         "150-px": "150px",
//         "180-px": "180px",
//         "200-px": "200px",
//         "210-px": "210px",
//         "580-px": "580px",
//       },
//       minWidth: {
//         "140-px": "140px",
//         48: "12rem",
//       },
//       backgroundSize: {
//         full: "100%",
//       },
//     },
//   },
//   plugins: [],
// };
