import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: { extend: { colors: { accent: { 50: "#eef6ff", 600: "#1668b2", 700: "#12538e" } } } },
  plugins: [],
} satisfies Config;
