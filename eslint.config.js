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
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPrettier,
  unicorn.configs['flat/recommended'],
  {
    rules: {
      /**
       * These rules are causing spurious errors related to ESLint not being
       * albe to resolve files that TypeScript can resolve without issue
       */
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
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
