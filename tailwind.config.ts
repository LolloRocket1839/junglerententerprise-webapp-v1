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
          light: "hsl(200 45% 65%)",
          dark: "hsl(200 35% 45%)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(210 20% 95%)",
          dark: "hsl(210 15% 85%)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          light: "hsl(180 35% 55%)",
          dark: "hsl(180 25% 35%)",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-slower": "float-slower 12s ease-in-out infinite",
        "gradient-slow": "gradient-slow 15s ease-in-out infinite",
        "scale-in": "scale-in 0.2s ease-out",
        "leaf-float": "leaf-float 6s ease-in-out infinite",
        "wave": "wave 3s ease-in-out infinite",
        "growth": "growth 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
        "magnetic-hover": "magnetic-hover 0.3s ease-in-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "shake": "shake 0.2s ease-in-out 0s 2",
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
