import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F7F4EE",
          50: "#FBFAF6",
          100: "#F7F4EE",
          200: "#EFEAE0",
        },
        navy: {
          DEFAULT: "#0E2A47",
          50: "#E8EDF3",
          700: "#123253",
          800: "#0E2A47",
          900: "#0A1F36",
          950: "#07172A",
        },
        charcoal: {
          DEFAULT: "#1C1F26",
          light: "#2A2E37",
        },
        slate: {
          muted: "#5C6672",
          faint: "#8A929C",
        },
        gold: {
          DEFAULT: "#A9852F",
          light: "#C4A15A",
          soft: "#B8965A",
          faint: "#E9DFC7",
        },
        line: {
          DEFAULT: "#DED8CB",
          dark: "#20344F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      fontSize: {
        "display": ["clamp(2.6rem, 5.2vw, 4.6rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "hero": ["clamp(3rem, 6vw, 5.4rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
