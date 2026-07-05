// Tailwind v4 ships as a PostCSS plugin rather than requiring a
// separate tailwind.config.js content-scanning setup. This file
// just tells PostCSS to run Tailwind (which scans the project
// automatically) followed by nothing else — no autoprefixer needed
// since Tailwind v4 handles vendor prefixing internally.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
