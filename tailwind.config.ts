import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/admin/admin-style.css",
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
      zIndex: {
        1: "1",
      },
      spacing: {
        '6.5': '1.625rem', // 6.5 * 4px = 26px
        '7.5': '1.875rem', // 7.5 * 4px = 30px
        '8.5': '2.125rem', // 8.5 * 4px = 34px
      },
      boxShadow: {
        "theme-sm":
          "0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        "theme-xs": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "theme-md":
          "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        "theme-lg":
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        "theme-xl":
          "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        datepicker: "-5px 0 0 #262d3c, 5px 0 0 #262d3c",
        "focus-ring": "0px 0px 0px 4px rgba(70, 95, 255, 0.12)",
        "slider-navigation":
          "0px 1px 2px 0px rgba(16, 24, 40, 0.1), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
        tooltip:
          "0px 4px 6px -2px rgba(16, 24, 40, 0.05), -8px 0px 20px 8px rgba(16, 24, 40, 0.05)",
        "drop-shadow-4xl":
          "0 35px 35px rgba(0, 0, 0, 0.25), 0 45px 65px rgba(0, 0, 0, 0.15)",
      },
      screens: {
        "2xsm": "375px",
        xsm: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "2000px",
      },
      colors: {
        brand: {
          25: "#f2f7ff",
          50: "#ecf3ff",
          100: "#dde9ff",
          200: "#c2d6ff",
          300: "#9cb9ff",
          400: "#7592ff",
          500: "#465fff",
          600: "#3641f5",
          700: "#2a31d8",
          800: "#252dae",
          900: "#262e89",
          950: "#161950",
        },
        gray: {
          25: "#fcfcfd",
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#e4e7ec",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828",
          950: "#0c111d",
        },
        success: {
          25: "#f6fef9",
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
          800: "#05603a",
          900: "#054f31",
          950: "#053321",
        },
        error: {
          25: "#fffbfa",
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fecdca",
          300: "#fda29b",
          400: "#f97066",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
          800: "#912018",
          900: "#7a271a",
          950: "#55160c",
        },
        warning: {
          25: "#fffcf5",
          50: "#fffaeb",
          100: "#fef0c7",
          200: "#fedf89",
          300: "#fec84b",
          400: "#fdb022",
          500: "#f79009",
          600: "#dc6803",
          700: "#b54708",
          800: "#93370d",
          900: "#7a2e0e",
          950: "#4e1d09",
        },
        primary: "#111828",
        secondary: "#667085",
        accent: {
          DEFAULT: "#004aad",
          hover: "#003a84",
        },
        body: "#dedede",

        yellowkouzua: "#D79B25",
        "yellowkouzua-dark": "#C4871F",
      },
      animation: {
        "animate-25s": "animate 25s linear infinite",
      },
      fontFamily: {
        sans: ['"Montserrat"', "sans-serif"], // Remplacez "sans" si vous souhaitez en faire la police par défaut.
        montserrat: ['"Montserrat"', "sans-serif"], // Clé personnalisée pour Montserrat.
        outfit: ["Outfit", "sans-serif"],
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
