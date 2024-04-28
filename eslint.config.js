/**
 * @fileoverview
 * NOTE: While eslint claims to support .mjs extensions, they don't seem to work
 * TODO: This needs cleanup, and it is probably not working entirely as expected
 * TODO: Add HTML Linting
 * TODO: Add Style Linting
 */

import { Legacy } from '@eslint/eslintrc/universal';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsonc from 'eslint-plugin-jsonc';
import jsoncParser from 'jsonc-eslint-parser';
import yml from 'eslint-plugin-yml';
import yamlParser from 'yaml-eslint-parser';
import mdx from 'eslint-plugin-mdx';
import mdxParser from 'eslint-mdx';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';

/**
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 * @typedef {import('eslint').Linter.RuleEntry} RuleEntry
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 * @typedef {import('eslint').Linter.ParserOptions} ParserOptions
 * @typedef {import('@typescript-eslint/utils/ts-eslint').FlatConfig.Config} InputConfig
 * @typedef {InputConfig & {extends?: InputConfig[]}} ConfigWithExtends
 * @typedef {import('@typescript-eslint/eslint-plugin')['rules']} TypeScriptRules
 * @typedef {import('@typescript-eslint/eslint-plugin')['meta']} TypeScriptMeta
 * @typedef {{rules: TypeScriptRules, meta: TypeScriptMeta}} TypeScriptPlugin
 * @typedef {FlatConfig['languageOptions']} LanguageOptions
 */
const baseDirectory = import.meta.dirname;
const compat = new FlatCompat({ baseDirectory });

const _rules = {
  prettier: prettier.rules,
  jsonc_base: jsonc.configs.base.overrides[0]?.rules,
  jsonc_auto: jsonc.configs['auto-config']?.rules,
  jsonc_json: jsonc.configs['recommended-with-json']?.rules,
  jsonc_jsonc: jsonc.configs['recommended-with-jsonc']?.rules,
  jsonc_prettier: jsonc.configs.prettier.rules,
  yaml_base: yml.configs.base.overrides[0]?.rules,
  yaml_standard: yml.configs.standard?.rules,
  yaml_recommended: yml.configs.recommended?.rules,
  yaml_prettier: yml.configs.prettier?.rules,
  mdx_base: mdx.configs.flat?.rules,
  mdx_blocks: mdx.configs.flatCodeBlocks?.rules,
  mdx_recommended: mdx.configs.recommended.overrides?.[0]?.rules,
  mdx_blocks_recommended: mdx.configs.recommended.overrides?.[1]?.rules,
  md_prettier: mdx.configs.recommended.overrides?.[2]?.rules,
  mdx_prettier: mdx.configs.recommended.overrides?.[3]?.rules,
  astro_recommended: astro.configs.recommended?.rules,
};

const rules = /** @type {{[key in keyof _rules]: RulesRecord}} */ (_rules);

const FILES = /** @type {const} */ ({
  js: '**/*.?(m|c)js',
  ts: '**/*?(.d).?(m|c)ts',
  react: '**/*.+(j|t)sx',
  astro: '**/*.astro',
  cssDotTs: '**/*.css.ts',
  declaration: '**/*.d.ts',
  tests: { test: '**/*.test.**', spec: '**/*.spec.**' },
  scripts: '**/*.astro/*.?(m|c)+(j|t)s',
  md: '**/*.md',
  mdx: '**/*.mdx',
  json: '**/*.json',
  jsonc: '**/*.jsonc',
  yaml: '**/*.y?(a)ml',
  blocks: {
    all: '**/*.md?(x)/**',
    js: '**/*.md?(x)/*.?(m|c)js',
    ts: '**/*.md?(x)/*?(.d).?(m|c)ts',
    react: '**/*.md?(x)/*.+(j|t)sx',
    astro: '**/*.md?(x)/*.astro',
  },
  pages: {
    all: 'src/pages/**/*',
    astro: 'src/pages/**/*.astro',
    api: { js: 'src/pages/**/*.?(m|c)js', ts: 'src/pages/**/*.?(m|c)ts' },
    md: 'src/pages/**/*.md?(x)',
  },
});

/** @param {keyof Omit<typeof tseslint.configs, 'base'|'eslintRecommended'>} preset */
const getTsEslintRules = (preset) => {
  const selected = tseslint.configs[preset];
  if (Array.isArray(selected)) return selected[2]?.rules;
  return selected.rules;
};

/** @type {ParserOptions} */
const tsParserOptions = {
  ...Legacy.environments.get('2022')?.parserOptions,
  project: './tsconfig.json',
  tsconfigRootDir: baseDirectory,
  jsDocParsingMode: 'all',
  EXPERIMENTAL_useProjectService: true,
  EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
  warnOnUnsupportedTypeScriptVersion: true,
  ecmaFeatures: {
    ...Legacy.environments.get('2022')?.parserOptions?.ecmaFeatures,
    impliedStrict: true,
  },
};

const tsLanguageOptions = {
  parser: tseslint.parser,
  parserOptions: tsParserOptions,
  globals: /** @type {const} */ ({
    ...Legacy.environments.get('2022')?.globals,
    NoInfer: 'readonly',
  }),
};

// Pages can contain server-side code
/** @type {ParserOptions} */
const tsPageParserOptions = {
  ...tsParserOptions,
  ...Legacy.environments.get('node')?.parserOptions,
  ecmaFeatures: {
    ...tsParserOptions.ecmaFeatures,
    ...Legacy.environments.get('node')?.parserOptions?.ecmaFeatures,
  },
};

const tsPageLanguageOptions = {
  parser: tseslint.parser,
  parserOptions: tsPageParserOptions,
  globals: {
    ...tsLanguageOptions.globals,
    ...Legacy.environments.get('node')?.globals,
  },
};

export default tseslint.config(
  /**
   * Acts like a global ignore for the files listed.
   * @see @link https://eslint.org/docs/latest/use/configure/ignore#ignoring-files
   */
  { ignores: ['.astro/'] },
  // Base config for all files, just register plugins
  ...compat.plugins('unicorn', 'yml', 'mdx', 'jsonc', '@typescript-eslint'),
  {
    files: [FILES.json],
    ignores: ['.vscode/settings.json', 'tsconfig.json'],
    rules: { ...rules.jsonc_base, ...rules.jsonc_json },
    languageOptions: {
      parser: jsoncParser,
      parserOptions: { jsonSyntax: 'JSONC' },
    },
  },
  {
    files: [FILES.jsonc, '.vscode/settings.json', 'tsconfig.json'],
    rules: { ...rules.jsonc_base, ...rules.jsonc_jsonc },
    languageOptions: {
      parser: jsoncParser,
      parserOptions: { jsonSyntax: 'JSONC' },
    },
  },

  {
    files: [FILES.json, FILES.jsonc],
    rules: { ...rules.jsonc_auto, ...rules.jsonc_prettier },
  },
  {
    files: [FILES.yaml],
    languageOptions: { parser: yamlParser },
    rules: {
      ...rules.yaml_base,
      ...rules.yaml_recommended,
      ...rules.yaml_prettier,
    },
  },
  {
    // Codeblocks produce a virtual file to be handled by it's respective parser
    files: [FILES.md, FILES.mdx],
    languageOptions: { ...mdx.configs.flat.languageOptions, parser: mdxParser },
    rules: { ...rules.mdx_base, ...rules.mdx_recommended },
  },
  {
    files: [FILES.md],
    rules: { ...rules.md_prettier },
  },
  {
    files: [FILES.mdx],
    rules: { ...rules.mdx_prettier },
  },
  {
    files: [FILES.blocks.all],
    rules: { ...rules.mdx_blocks, ...rules.mdx_blocks_recommended },
  },
  {
    files: [FILES.md, FILES.mdx],
    ignores: [FILES.pages.all, FILES.blocks.all, FILES.scripts],
    rules: {
      'unicorn/filename-case': [
        'error',
        { case: 'snakeCase', ignore: ['^[A-Z0-9_]+\\.mdx?'] }, // Allow SCREAM_CASE
      ],
    },
  },
  ...compat.config({
    overrides: [
      {
        // Define the configuration for `.astro` file.
        files: [FILES.astro],
        // Enable this plugin
        plugins: ['astro', 'unicorn'],
        extends: [
          'airbnb',
          'airbnb/hooks',
          'plugin:astro/recommended',
          'plugin:astro/jsx-a11y-recommended',
          // 'plugin:unicorn/recommended',
        ],
        // Enables global variables available in Astro components.
        env: { node: true, 'astro/astro': true, es2020: true },
        // Allows Astro components to be parsed.
        parser: 'astro-eslint-parser',
        // Parse the script in `.astro` as TypeScript by adding the following configuration.
        // It's the setting you need when using TypeScript.
        parserOptions: {
          parser: '@typescript-eslint/parser',
          extraFileExtensions: ['.astro'],
          // The script of Astro components uses ESM.
          sourceType: 'module',
          project: './tsconfig.json',
        },
      },
      {
        // Define the configuration for `<script>` tag.
        // Script in `<script>` is assigned a virtual file name with the `.js` extension.
        files: [FILES.scripts],
        env: { browser: true, es2020: true },
        plugins: ['astro', 'unicorn'],
        extends: [
          'airbnb',
          'airbnb/hooks',
          'plugin:astro/jsx-a11y-recommended',
          // 'plugin:unicorn/recommended',
        ],
        parserOptions: { sourceType: 'module', project: './tsconfig.json' },
      },
    ],
  }),
  {
    files: [FILES.js, FILES.ts, FILES.react],
    ignores: ['playwright/tests-examples/*.ts'],
    languageOptions: tsLanguageOptions,
    extends: compat.extends(
      'airbnb',
      'airbnb/hooks',
      // 'plugin:unicorn/recommended',
    ),
  },
  {
    files: [FILES.pages.api.js, FILES.pages.api.ts],
    languageOptions: tsPageLanguageOptions,
  },
  {
    files: [FILES.js, FILES.ts, FILES.react, FILES.astro, FILES.scripts],
    ignores: ['playwright/tests-examples/*.ts'],
    rules: {
      ...eslint.configs.recommended.rules,
      ...getTsEslintRules('recommendedTypeChecked'),
      ...getTsEslintRules('stylisticTypeChecked'),
      'no-underscore-dangle': 'off',
      'react/require-default-props': 'off',
      'consistent-return': 'off',
      'no-void': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: '(^_)|(^Props$)',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-props-no-spreading': [
        'error',
        { html: 'ignore', exceptions: [] },
      ],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.astro', '.jsx', '.tsx'] },
      ],
      'no-use-before-define': [
        'error',
        { functions: false, allowNamedExports: true },
      ],
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'unicorn/no-array-for-each': 'off',
      'unicorn/prevent-abbreviations': [
        'warn',
        {
          ignore: [/ref/i, /err/i, /fn/i, /args/i, /props/i, /params/i, /env/i],
        },
      ],
      ...rules.prettier,
    },
  },
  {
    files: [FILES.astro, FILES.scripts],
    rules: {
      ...rules.astro_recommended,
      // astro plugin replaces this rule
      // TODO: Disable other jsx-ally rules that are replaced by astro
      'jsx-a11y/alt-text': 'off',
      // TODO: This should allow astro attributes in astro JSX, but it doesn't
      'react/no-unknown-property': 'off',
      // Needed for the `inferface Props` pattern
      '@typescript-eslint/consistent-type-definitions': 'off',
      // ESLint can't tell `strictNullChecks` is on in `.astro` files
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true },
      ],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true },
      ],
    },
  },
  {
    files: [FILES.tests.test, FILES.tests.spec],
    rules: { 'unicorn/filename-case': ['warn', { case: 'kebab-case' }] },
  },
  {
    files: [FILES.cssDotTs],
    rules: {
      camelcase: 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    files: [FILES.js, FILES.ts, FILES.react],
    ignores: [FILES.pages.all, FILES.blocks.all, FILES.scripts],
    rules: {
      'unicorn/filename-case': [
        'error',
        { cases: { camelCase: true, pascalCase: true } },
      ],
    },
  },
  {
    files: [FILES.tests.test, FILES.tests.spec],
    rules: { 'unicorn/filename-case': ['warn', { case: 'kebabCase' }] },
  },
  {
    files: [FILES.declaration],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-static-only-class': 'off',
    },
  },
  {
    files: [FILES.astro],
    ignores: [FILES.pages.all, FILES.blocks.all, FILES.scripts],
    rules: { 'unicorn/filename-case': ['error', { case: 'pascalCase' }] },
  },
  {
    files: [FILES.scripts],
    processor: astro.processors['client-side-ts'],
  },
  {
    files: [FILES.json, FILES.jsonc, FILES.yaml, FILES.pages.all],
    ignores: [FILES.pages.all, FILES.blocks.all, FILES.scripts],
    rules: { 'unicorn/filename-case': ['error', { case: 'kebabCase' }] },
  },
);
