/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          violet: '#6366f1',
          blue: '#3b82f6',
          orange: '#f97316',
        },
        secondary: {
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b',
        },
        neutral: {
          black: '#0f172a',
          'dark-gray': '#1e293b',
          'medium-gray': '#64748b',
          'light-gray': '#f1f5f9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        accent: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'h1-desktop': '56px',
        'h1-mobile': '36px',
        'h2-desktop': '42px',
        'h2-mobile': '32px',
        'h3-desktop': '32px',
        'h3-mobile': '24px',
        'body-desktop': '18px',
        'body-mobile': '16px',
      },
    },
  },
  plugins: [],
}
