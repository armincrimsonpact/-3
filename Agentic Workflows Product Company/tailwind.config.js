/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        // Custom color palette for Agentic Workflows
        aubergine: {
          50: '#f8f6f8',
          100: '#f0edf0',
          200: '#e1dce1',
          300: '#c8bfc8',
          400: '#a89ba8',
          500: '#8a7a8a',
          600: '#6d5d6d',
          700: '#4a2c4d', // Primary aubergine
          800: '#3d253f',
          900: '#2f1e31',
        },
        gold: {
          50: '#fefcf7',
          100: '#fdf8ed',
          200: '#faf0d3',
          300: '#f6e4a9',
          400: '#f0d275',
          500: '#e8bc4a',
          600: '#c4975a', // Primary warm gold
          700: '#b8863a',
          800: '#9a6d2f',
          900: '#7d5a28',
        },
        blush: {
          50: '#fdf8f5',
          100: '#fbf1ec',
          200: '#f6e3d6',
          300: '#f0d0bc',
          400: '#e8b99d',
          500: '#d4af9a', // Primary soft blush
          600: '#c19a7a',
          700: '#a87f5f',
          800: '#8a674d',
          900: '#715540',
        },
        sage: {
          50: '#f4f6f4',
          100: '#e8ede8',
          200: '#d1d9d1',
          300: '#b3c0b3',
          400: '#8fa68e', // Primary sage green
          500: '#7a9179',
          600: '#5f745e',
          700: '#4c5d4b',
          800: '#3f4c3e',
          900: '#343f33',
        },
        warm: {
          50: '#fefdfc',
          100: '#fdfbf9',
          200: '#faf7f3',
          300: '#f5f3f0', // Primary warm white
          400: '#ede9e4',
          500: '#e0dcd7',
          600: '#c8c4bf',
          700: '#a8a4a0',
          800: '#8a8682',
          900: '#6b6763',
        },
        charcoal: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d4d4d7',
          300: '#b3b3b8',
          400: '#8e8e95',
          500: '#6b7280', // Primary charcoal gray
          600: '#5a5f6b',
          700: '#4a4e58',
          800: '#3d4048',
          900: '#33353c',
        },
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "gradient": "gradient 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
