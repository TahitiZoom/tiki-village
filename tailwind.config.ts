// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C2B4D',        // Bleu foncé
        secondary: '#E63946',       // Rouge corail
        accent: '#4ECDC4',          // Teal (boutons, prix, calendrier)
        sand: '#FDF8F3',            // Fond sable/crème
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config;
