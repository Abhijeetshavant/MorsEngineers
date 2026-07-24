/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#0A192F",
          darkNavy: "#1A233A",
          lightNavy: "#2A3B5C",
        },
        secondary: {
          orange: "#FF5722",
          lightOrange: "#F97316",
        },
        accent: {
          cyan: "#00E5FF",
          lightCyan: "#06B6D4",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          slate: "#1E293B",
        },
        light: {
          DEFAULT: "#FFFFFF",
          slate: "#F8FAFC",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        marquee: "marquee 25s linear infinite",
        counter: "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { opacity: 0.5, filter: "blur(10px)" },
          "100%": { opacity: 1, filter: "blur(0px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
