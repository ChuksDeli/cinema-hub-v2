/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#111111',
        'bg-card': '#161616',
        'bg-card-hover': '#1C1C1C',
        'accent': '#E50914',
        'accent-hover': '#C2070F',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A3A3A3',
        'text-muted': '#525252',
        'border-default': '#1F1F1F',
        'border-hover': '#333333',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'cursive'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
