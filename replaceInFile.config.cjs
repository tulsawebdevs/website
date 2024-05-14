/**
 * This file is used by the "api:sdk" npm script to configure `replace-in-file`
 * @see https://www.npmjs.com/package/replace-in-file#cli-usage
 * @see file://./package.json#scripts.api:sdk
 */
module.exports = {
  files: './src/sdk.ts',
  from: /\ntype /g,
  to: '\nexport type ',
};
