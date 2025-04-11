import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // додаткові кастомні кольори (якщо захочеш)
        transparent: "transparent",
        current: "currentColor",
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    tailwindcssAnimate, // плагін для анімацій
  ],
  // увімкнути підтримку кастомних змінних типу bg-[--color]
}

export default config;
