module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prefer-arrow'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],

    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'max-len': ['error', { code: 120 }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
  },
};
