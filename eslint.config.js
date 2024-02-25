/**
 * @fileoverview
 * NOTE: While eslint claims to support .mjs extensions, they don't seem to work
 */

import * as eslintrc from '@eslint/eslintrc';
import eslint from '@eslint/js';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import eslintPrettier from 'eslint-config-prettier';

const baseDirectory = import.meta.dirname;

/** @see https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config  */
const compat = new eslintrc.FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  eslint.configs.recommended,
  ...compat.extends('eslint-config-airbnb', 'eslint-config-airbnb/hooks'),
  {
    ...unicorn.configs['flat/all'],
    ignores: [
      'src/env.d.ts',
      'src/ts-env.d.ts',
      'playwright/tests-examples/*.ts',
    ],
  },
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPrettier,
  {
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      /** These on by default rules DO NOT work well for this project */
      'import/no-unresolved': 'off',
      /** These off by default rules DO work well with this project */
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: baseDirectory,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  },
);
