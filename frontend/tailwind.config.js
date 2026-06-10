/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8eef5',
          100: '#c5d5e8',
          200: '#9fb9d9',
          300: '#789eca',
          400: '#5b8abf',
          500: '#3e76b4',
          600: '#1e3a5f',
          700: '#182e4c',
          800: '#122339',
          900: '#0c1726',
        },
        accent: {
          50: '#e6f7f5',
          100: '#ccefeb',
          200: '#99dfd7',
          300: '#66cfc3',
          400: '#33bfaf',
          500: '#0d9488',
          600: '#0b7a70',
          700: '#086058',
          800: '#064640',
          900: '#032c28',
        },
        city: {
          dark: '#0f172a',
          steel: '#334155',
          mist: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'city': '0 4px 20px rgba(30, 58, 95, 0.12)',
        'city-lg': '0 10px 40px rgba(30, 58, 95, 0.18)',
        'glow-teal': '0 0 20px rgba(13, 148, 136, 0.3)',
        'glow-blue': '0 0 20px rgba(30, 58, 95, 0.3)',
      },
    },
  },
  plugins: [],
};
