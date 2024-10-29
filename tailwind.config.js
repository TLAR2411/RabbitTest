import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{vue,js,ts,jsx,tsx}", "./client/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": theme("colors.pink.500"),
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
    },
  },
  plugins: [forms, typography],
};
