/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-brown': '#6d3a2e',
        'primary-gold': '#b17f3c',
        'accent-cream': '#f1ebd5',
        'text-dark': '#333333',
        'text-light': '#ffffff',
        'background-light': '#f9f7f2',
        'background-dark': '#1a1a1a',
      },
      fontFamily: {
        lora: ['var(--font-lora)'],
        raleway: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [],
};

export default config; 