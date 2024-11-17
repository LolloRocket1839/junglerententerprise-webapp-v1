import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4CAF50",
          light: "#66BB6A",
          dark: "#388E3C",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          light: "#FFFFFF",
          dark: "#E0E0E0",
        },
      },
      keyframes: {
        "leaf-float": {
          "0%, 100%": { transform: "rotate(0deg) translateY(0)" },
          "25%": { transform: "rotate(5deg) translateY(-15px)" },
          "75%": { transform: "rotate(-5deg) translateY(15px)" },
        },
        "snow-fall": {
          "0%": { transform: "translateY(-10px) translateX(-10px)" },
          "100%": { transform: "translateY(100vh) translateX(10px)" },
        },
        "rain-fall": {
          "0%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "leaf-float": "leaf-float 6s ease-in-out infinite",
        "snow-fall": "snow-fall 10s linear infinite",
        "rain-fall": "rain-fall 1s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;