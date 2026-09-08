/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maha: {
          navy: '#0b2b4d',
          darknavy: '#0b1e33',
          sidebar: '#0c2136',
          sidebarHover: '#132d47',
          blue: '#1a73e8',
          blueHover: '#1557b0',
          lightBlue: '#e8f0fe',
          orange: '#e65100',
          gold: '#f59e0b',
          border: '#e2e8f0',
          bg: '#f8fafc',
          card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Public Sans', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
