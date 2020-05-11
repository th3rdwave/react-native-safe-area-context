const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json');
const typescriptEslintPrettier = require('eslint-config-prettier/@typescript-eslint');

module.exports = {
  extends: ['@react-native-community'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      // Apply the recommended Typescript defaults and the prettier overrides to all Typescript files
      rules: Object.assign(
        typescriptEslintRecommended.rules,
        typescriptEslintPrettier.rules,
        {
          '@typescript-eslint/explicit-member-accessibility': 'off',
          '@typescript-eslint/explicit-function-return-type': 'off',
          '@typescript-eslint/no-use-before-define': 'off',
          '@typescript-eslint/ban-ts-ignore': 'off',
          'react-native/no-inline-styles': 'off',
        },
      ),
    },
  ],
};
