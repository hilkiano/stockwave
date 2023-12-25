import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-work-sans)", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};
export default config;
