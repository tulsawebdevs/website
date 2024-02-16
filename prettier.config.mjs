const config = /** @type {import('prettier').Config} */ ({
  experimentalTernaries: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: false,
  endOfLine: "lf",
  trailingComma: "all",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
});

export default config;
