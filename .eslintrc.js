module.exports = {
    env: {
      es2022: true,
      // 'jest/globals': true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
      'jest',
      'import',
      '@typescript-eslint',
    ],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      requireConfigFile: false,
    },
    rules: {
      'class-methods-use-this': 0,
      'max-len': 0,
      'no-useless-catch': 0,
      'consistent-return': 0,
      radix: 0,
      'no-console': 0,
      'array-callback-return': 0,
      'no-underscore-dangle': 0,
      'import/prefer-default-export': 0,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'max-classes-per-file': ['error', { ignoreExpressions: true, max: 2 }],
    },
  };
  