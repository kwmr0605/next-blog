/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baseColor: '#738b93',
        accentColor: '#52bec6',
        subColor: '#e1edf6',
        cardBg: 'rgba(115, 139, 147, 0.15)',
        glassBg: 'rgba(115, 139, 147, 0.85)',
        glassHover: 'rgba(115, 139, 147, 0.9)',
        fontColor: '#e1edf6',
        fontSecondary: '#a8c5d1',
      },
      backdropBlur: {
        glass: '20px',
        'glass-strong': '40px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(82, 190, 198, 0.15)',
        'glass-hover': '0 8px 48px 0 rgba(82, 190, 198, 0.25)',
        neon: '0 0 20px rgba(82, 190, 198, 0.5), 0 0 40px rgba(82, 190, 198, 0.3)',
      },
    },
  },
  plugins: [],
};
