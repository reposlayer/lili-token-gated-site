import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        solana: {
          DEFAULT: "#9945FF",
          dark: "#512DA8"
        }
      }
    }
  },
  plugins: []
};

export default config;
