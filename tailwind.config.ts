import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        malayalam: ["Manjari", "Gayathri", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fdf6ee",
          100: "#fae8d0",
          200: "#f4ce9d",
          300: "#ecad63",
          400: "#e48d38",
          500: "#de741e",
          600: "#c55a14",
          700: "#a44213",
          800: "#843517",
          900: "#6c2d16",
          950: "#3c1409",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "68ch",
            lineHeight: "1.8",
            fontSize: "1.125rem",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
