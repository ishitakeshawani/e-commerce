import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        white: '#FFFFFF',
        customGray: '#333333',
        navbarItemColor: '#000000',
        bannerColor: '#F4F4F4'
      },
    },
  },
  plugins: [],
} satisfies Config;
