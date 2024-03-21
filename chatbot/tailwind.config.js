/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { 'york_blue': '#293b47', },
      fontFamily: {
        'LexendBlack': ['LexendBlack'],
        'LexendLight':['LexendLight'],
        'LexendRegular':['LexendRegular'],
        'LexendThin':['LexendThin'],
        'LexendBold':['LexendBold'],
      },
      borderWidth:{
        '1':'1px',
        '0.5':'0.5px',
      },
      padding: {
        '1.5px': '1.5px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
