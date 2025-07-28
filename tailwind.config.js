const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kcred: "var(--kcred)",
        kcredlight: "var(--kcredlight)",
        scrollbarbac: "var(--scrollbarbac)",
        cyellow: "var(--cyellow)",
        cblack: "var(--cblack)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(__myFont_1758f6)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
