import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1200px",
      },
      padding: {
        DEFAULT: "1.5rem",
        sm: "1.75rem",
        md: "2rem",
        lg: "3rem",
        xl: "3.5rem",
        "2xl": "4rem",
      },
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-contrast": "rgb(var(--surface-contrast) / <alpha-value>)",
        brand: {
          DEFAULT: "rgb(var(--brand-500) / <alpha-value>)",
          foreground: "rgb(var(--brand-foreground) / <alpha-value>)",
          400: "rgb(var(--brand-400) / <alpha-value>)",
          500: "rgb(var(--brand-500) / <alpha-value>)",
          600: "rgb(var(--brand-600) / <alpha-value>)",
        },
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        neutral: {
          50: "rgb(var(--neutral-50) / <alpha-value>)",
          100: "rgb(var(--neutral-100) / <alpha-value>)",
          200: "rgb(var(--neutral-200) / <alpha-value>)",
          300: "rgb(var(--neutral-300) / <alpha-value>)",
          400: "rgb(var(--neutral-400) / <alpha-value>)",
          500: "rgb(var(--neutral-500) / <alpha-value>)",
          600: "rgb(var(--neutral-600) / <alpha-value>)",
          700: "rgb(var(--neutral-700) / <alpha-value>)",
          800: "rgb(var(--neutral-800) / <alpha-value>)",
          900: "rgb(var(--neutral-900) / <alpha-value>)",
          950: "rgb(var(--neutral-950) / <alpha-value>)",
        },
        mac: {
          window: "rgb(var(--window) / <alpha-value>)",
          sidebar: "rgb(var(--sidebar-gray) / <alpha-value>)",
          chrome: {
            red: "rgb(var(--mac-traffic-red) / <alpha-value>)",
            yellow: "rgb(var(--mac-traffic-yellow) / <alpha-value>)",
            green: "rgb(var(--mac-traffic-green) / <alpha-value>)",
          },
          accent: {
            blue: "rgb(var(--accent-blue) / <alpha-value>)",
            purple: "rgb(var(--accent-purple) / <alpha-value>)",
            green: "rgb(var(--accent-green) / <alpha-value>)",
          },
        },
      },
      borderRadius: {
        "2xl": "var(--radius-2xl)",
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        36: "9rem",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        elevated: "var(--shadow-window)",
        window: "0 50px 120px -60px rgba(4, 6, 18, 0.6)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
