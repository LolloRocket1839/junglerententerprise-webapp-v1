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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-slow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "leaf-float": {
          "0%, 100%": { 
            transform: "rotate(0deg) translateY(0)",
          },
          "25%": { 
            transform: "rotate(5deg) translateY(-15px)",
          },
          "75%": {
            transform: "rotate(-5deg) translateY(15px)",
          }
        },
        "wave": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          }
        },
        "growth": {
          from: { 
            transform: "scale(0) translateY(10px)",
            opacity: "0"
          },
          to: { 
            transform: "scale(1) translateY(0)",
            opacity: "1"
          }
        },
        "magnetic-hover": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(3px)" }
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" }
        },
        "slide-in": {
          from: { transform: "translateX(-20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "haptic-flash": {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.15)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
        "accordion-up": "accordion-up 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
        "fade-in": "fade-in 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "float-slow": "float-slow 8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "float-slower": "float-slower 12s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "gradient-slow": "gradient-slow 15s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "scale-in": "scale-in 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
        "leaf-float": "leaf-float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave": "wave 3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "growth": "growth 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
        "magnetic-hover": "magnetic-hover 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-gentle": "pulse-gentle 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "shake": "shake 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s 2",
        "slide-in": "slide-in 0.35s cubic-bezier(0.33, 1, 0.68, 1)",
        "haptic-flash": "haptic-flash 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.0, 0.0, 0.2, 1)",
        "out-expo": "cubic-bezier(0.4, 0.0, 1, 1)",
        "in-out-expo": "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
