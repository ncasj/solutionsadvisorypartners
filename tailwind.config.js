module.exports = {
  content: ["./*.html", "./insights/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: { dark: '#0f172a', accent: '#38bdf8', light: '#f8fafc' },
      },
    },
  },
};
