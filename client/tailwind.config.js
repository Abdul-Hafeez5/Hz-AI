/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flex: {
        4: "4 1 0",
      },
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, #217bfe, #e55571) ",
      },
      backgroundColor: {
        "primary-dark": "#2c2937",
        "primary-extra-dark": "#12101b",
        "primary-light": "#605e68",
        "primary-extra-light": "#ddd",
        
      },
      textColor: {
        "primary-light": "#ececec",
        "primary-extra-light": "#888"
      },
      borderColor: {
        "primary-light ": "#555",
      },
    },
  },
  plugins: [],
};
