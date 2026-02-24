/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Quiz Design System – aligned with Landing Page palette
        primary: {
          DEFAULT: '#FF6B9D',
          hover: '#e85a8a',
          light: '#FFF0F5',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          light: '#E5F9F6',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F4A261',
        },
        background: {
          DEFAULT: '#F8F1F9',
          alt: '#EDE3F2',
        },
        surface: '#FFFFFF',
        border: '#E2D6EA',
        input: '#E2D6EA',
        ring: '#FF6B9D',
        text: {
          primary: '#2C3E50',
          body: '#4F5D75',
          muted: '#9CA3AF',
        },
        error: '#D9534F',
        success: '#6A9B7E',
        foreground: '#2C3E50',
        // shadcn compatibility
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2C3E50',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#2C3E50',
        },
        muted: {
          DEFAULT: '#EDE3F2',
          foreground: '#9CA3AF',
        },
        destructive: {
          DEFAULT: '#D9534F',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '44px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['28px', { lineHeight: '32px', fontWeight: '600', letterSpacing: '-0.01em' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'btn': ['18px', { lineHeight: '1', fontWeight: '600' }],
        'micro': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        'card': '0 1px 3px rgba(44, 33, 27, 0.08)',
        'card-hover': '0 4px 12px rgba(44, 33, 27, 0.12)',
        'result': '0 10px 30px rgba(44, 33, 27, 0.15)',
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
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 107, 157, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(255, 107, 157, 0)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
        "stroke-draw": {
          from: { strokeDashoffset: "100" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shake": "shake 0.4s ease-in-out",
        "stroke-draw": "stroke-draw 0.5s ease-out forwards",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
