import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF7",
        card: "#FFFFFF",
        forest: {
          DEFAULT: "#2F6B3E",
          soft: "#E8F1EB",
          deep: "#225A2F",
        },
        sky: {
          DEFAULT: "#4A90D9",
          soft: "#E6F0FA",
        },
        orange: {
          DEFAULT: "#E8923C",
          soft: "#FBEEDD",
        },
        ink: "#1A1A1A",
        mute: "#6B7280",
      },
      borderRadius: {
        card: "24px",
        tile: "16px",
        chip: "999px",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.08)",
        floaty:
          "0 4px 12px -2px rgba(15,23,42,0.08), 0 16px 40px -12px rgba(15,23,42,0.12)",
      },
      keyframes: {
        barGrow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        barGrow: "barGrow 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        fadeUp: "fadeUp 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
