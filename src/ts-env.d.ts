/**
 * @fileoverview Augment modules or globals in this file, when necessary.
 */

// Just to make ESLint happy, doesn't actually overwrite the global NoInfer type
declare type NoInfer<A> = A;

declare module 'eslint-plugin-unicorn' {
  import type { Linter } from 'eslint';

  const configs: {
    'flat/recommended': Linter.RulesRecord;
    'flat/all': Linter.RulesRecord;
  };

  export default { configs };
}
