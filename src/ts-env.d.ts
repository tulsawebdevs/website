/* eslint

  @typescript-eslint/consistent-type-definitions: [2,'interface']
  --
  This file is for augmenting modules or globals; thus, by definition, all types
  in this file are extensible. Extensible types should be defined as interfaces.
  
 */

/**
 * @fileoverview Augment modules or globals in this file, when necessary.
 */

// Just to make ESLint happy, doesn't actually overwrite the global NoInfer type

module '@eslint/eslintrc/universal' {
  import type { ESLint } from 'eslint';

  export class Legacy {
    static environments: Map<string, ESLint.Environment>;
  }
}

interface ImportMetaEnv {
  PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
  API_VERSION?: string;
}
