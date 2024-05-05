import { transform } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: " 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);",
      },
      animation: {
        fadeIn: "fadeIn 0.1s cubic-bezier(1, 0, 0.1, 1.01)",
        fadeOut: "fadeOut 0.3s cubic-bezier(1, 0, 0.1, 1.01)",
        scaleIn: "scaleIn 0.3s cubic-bezier(1, 0, 0.1, 1.01)",
        scaleOut: "scaleOut 0.3s cubic-bezier(1, 0, 0.1, 1.01)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.8" },
        },
        fadeOut: {
          "0%": { opacity: "0.8" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(0)" },
        },
      },
    },
  },
  plugins: [],
};
