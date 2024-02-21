/** @typedef {import('prettier').Config} PrettierConfig */

/** @type {PrettierConfig} */
const config = {
  experimentalTernaries: true,
  useTabs: true,
  singleQuote: true,
  plugins: ["prettier-plugin-astro"],
};

export default config;
