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
          DEFAULT: "#38a169",
          hover: "#2f855a",
          active: "#276749",
          light: "#68d391",
          dark: "#1a2f25",
        },
        secondary: {
          DEFAULT: "#4fd1c5",
          light: "#81e6d9",
          dark: "#234434",
        },
        success: {
          DEFAULT: "#68d391",
          light: "#9ae6b4",
          dark: "#38a169",
        },
        neutral: {
          DEFAULT: "#81e6d9",
          light: "#e2e8f0",
          dark: "#1e3a2f",
        },
        attention: "#f6e05e",
      },
      backgroundImage: {
        'gradient-dark': `
          linear-gradient(
            to bottom right,
            rgba(26, 47, 37, 1),
            rgba(35, 68, 52, 1),
            rgba(30, 58, 47, 1)
          )
        `,
        'card-hover': `
          linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.03)
          )
        `,
        'image-overlay': `
          linear-gradient(
            to bottom,
            rgba(26, 47, 37, 0.4),
            rgba(26, 47, 37, 0.7)
          )
        `,
      },
      boxShadow: {
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'success-glow': '0 0 20px rgba(72, 187, 120, 0.1)',
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
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        "leaf-float": "leaf-float 6s ease-in-out infinite",
        "snow-fall": "snow-fall 10s linear infinite",
        "rain-fall": "rain-fall 1s linear infinite",
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
