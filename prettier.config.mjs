const config = /** @type {import('prettier').Config} */ ({
  experimentalTernaries: true,
  useTabs: true,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  endOfLine: "lf",
  trailingComma: "all",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
});

export default config;
