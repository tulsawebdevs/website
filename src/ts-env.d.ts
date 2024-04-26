/**
 * @fileoverview Augment modules or globals in this file, when necessary.
 */

// Just to make ESLint happy, doesn't actually overwrite the global NoInfer type

declare module '@eslint/eslintrc/universal' {
  import type { ESLint } from 'eslint';

  export class Legacy {
    static environments: Map<string, ESLint.Environment>;
  }
}
