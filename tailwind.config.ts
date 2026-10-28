import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#A85E3B",
          deep: "#7E422D",
          light: "#C67D5A",
        },
        forest: {
          DEFAULT: "#536849",
          deep: "#354632",
          light: "#6E8762",
        },
        sand: {
          DEFAULT: "#D1B58B",
          light: "#E3CCA7",
          dark: "#B89665",
        },
        clay: {
          muted: "#E9D8C6",
          light: "#F3E9DD",
        },
        charcoal: {
          DEFAULT: "#282923",
          soft: "#3C3D36",
        },
        ivory: {
          warm: "#F7F3EA",
          light: "#FAF7F2",
        },
        paper: "#FFFEFB",
        border: "#E5DED3",
        secondary: "#716B61",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'paper-grain': "radial-gradient(#d1b58b15 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
