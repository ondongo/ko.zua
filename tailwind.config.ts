import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#111828",
        secondary: "#667085",
        accent: {
          DEFAULT: "#004aad",
          hover: "#003a84",
        },
        body: "#dedede",
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'], // Remplacez "sans" si vous souhaitez en faire la police par défaut.
        montserrat: ['"Montserrat"', 'sans-serif'], // Clé personnalisée pour Montserrat.
      },

      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-background-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var (--tw-gradient-background-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;
