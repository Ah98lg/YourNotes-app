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
      'light-brown': '#ffda9e',
      'brown': '#3d2b1f',
      'blue': '#000080',
      'black': '#000000',
      'white': '#FFFFFF',
      'green': '#008000',
      'red': '#FF0000',
      'gray': '#808080',
      'light-gray': '#D3D3D3',
      'dark-gray': '#A9A9A9',
    },
  },
  plugins: [],
} satisfies Config;
