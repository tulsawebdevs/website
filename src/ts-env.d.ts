/**
 * @fileoverview Augment modules or globals in this file, when necessary.
 */

declare module 'eslint-plugin-unicorn' {
  import type { Linter } from 'eslint';

  const configs: {
    'flat/recommended': Linter.RulesRecord;
    'flat/all': Linter.RulesRecord;
  };

  export default { configs };
}
