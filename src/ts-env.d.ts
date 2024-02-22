/**
 * @fileoverview Augment modules or globals in this file, when necessary.
 */

declare namespace NodeJS {
  /**
   * Fix errors from some untyped JS dependencies that use the unsound
   * (but common) `['dep1', 'dep2'].map(require.resolve)` pattern.
   */
  interface RequireResolve {
    (path: string): string;
  }
}
