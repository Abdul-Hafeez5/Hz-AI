/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flex: {
        4: "4 1 0",
      },
      colors: { "blue-custom": "#217bfe", "pink-custom": "#e55571" },
      backgroundColor: {
        "primary-dark": "#2c2937",
        "primary-extra-dark": "#12101b",
        "primary-light": "#605e68",
        "primary-extra-light": "#ddd",
        "blue-custom": "#217bfe",
        "blue-dark": "#140e2d",
      },
      textColor: {
        "primary-light": "#ececec",
        "primary-extra-light": "#888",
      },
      borderColor: {
        "primary-light ": "#555",
      },
      animation: {
        "Slide-Bg": "slideBg 8s ease-in-out alternate",
        "Rotate-Orbital": "rotateOrbital 100s linear infinite",
        "Bot-Animate": "botAnimate 3s ease-in-out infinite alternate ",
      },
      keyframes: {
        slideBg: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        botAnimate: {
          "0% ": {
            transform: "scale(1) rotate(0deg)",
          },
          "100%": {
            transform: "scale(1.1) rotate(-5deg)",
          },
        },
        rotateOrbital: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(60deg)",
          },
        },
      },
      translate: { "-1/2": "-50%" },
    },
  },
  plugins: [],
};
