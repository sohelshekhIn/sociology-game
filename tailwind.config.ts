import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#EC4899",
        bg: "#fafafa",
        text: "#141C2C",
        accent: "#facc15",
      },
    },
  },
  plugins: [],
};
export default config;
