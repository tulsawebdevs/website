/** @typedef {import('prettier').Config} PrettierConfig */

/** @type {PrettierConfig} */
const config = {
	experimentalTernaries: true,
	singleQuote: true,
  plugins: ["prettier-plugin-astro"],
};

export default config;
