import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        ink: "#000000",
        paper: "#d7d7d7",
        snow: "#ffffff",
      },
      fontFamily: {
        display: ["var(--font-raleway)", "sans-serif"],
        ui: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-opensans)", "sans-serif"],
      },
      maxWidth: {
        page: "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
