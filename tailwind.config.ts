import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      'postit-yellow': '#FFD700',
      'blue-pen': '#000080',
      'black': '#000000',
      'white': '#FFFFFF',
      'green': '#008000',
      'red': '#FF0000',
    },
  },
  plugins: [],
} satisfies Config;
