/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        borderShine: {
          "0%": { borderImage: "linear-gradient(45deg, #ffd700, #ffec8b, #ffd700) 1 100%" },
          "50%": { borderImage: "linear-gradient(45deg, #ffec8b, #ffd700, #ffec8b) 1 100%" },
          "100%": { borderImage: "linear-gradient(45deg, #ffd700, #ffec8b, #ffd700) 1 100%" },
        },
      },
      animation: {
        scan: "scan 2s linear infinite",
        shine: "shine 3s linear infinite",
        "shine-slow": "shine 4s linear infinite",
        "shine-slower": "shine 5s linear infinite",
        "border-shine": "borderShine 3s linear infinite",
        "border-shine-slow": "borderShine 4s linear infinite",
        "border-shine-slower": "borderShine 5s linear infinite",
      },
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
      },
    },
  },
  plugins: [],
}

