/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fdf4ee',
          100: '#fae6d6',
          200: '#f4c9a8',
          300: '#eda878',
          400: '#e58252',
          500: '#d96a3a',
          600: '#c2542c',
          700: '#a04124',
          800: '#7d3420',
          900: '#5f2a1c',
        },
        emerald2: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        charcoal: {
          50: '#f6f6f5',
          100: '#e7e7e5',
          200: '#d1d1cd',
          300: '#adada6',
          400: '#82827a',
          500: '#66665e',
          600: '#51514a',
          700: '#41413c',
          800: '#2b2b28',
          900: '#1c1c1a',
          950: '#121211',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(28, 28, 26, 0.08)',
        card: '0 8px 30px -8px rgba(28, 28, 26, 0.12)',
        float: '0 -8px 30px -6px rgba(28, 28, 26, 0.18)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        slideInRight: 'slideInRight 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        fadeIn: 'fadeIn 0.25s ease-out',
        scaleIn: 'scaleIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        pulseRing: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
