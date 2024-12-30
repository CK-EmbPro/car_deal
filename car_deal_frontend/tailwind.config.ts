import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  mode: "jit", // Enable JIT mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        searchFormBg: "#F5F5F5",
        textColor: "#152440",
        inputFormBorderColor: "#cacaca",
        redColor: "#DB4444",
      },
    },
    plugins: [require("tailwindcss-animate")],
  },
};

export default config;
