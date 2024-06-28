module.exports = {
  extends: ['@react-native'],
  plugins: ['@react-native/eslint-plugin-specs'],
  rules: {
    'react-native/no-inline-styles': 'off',
    '@react-native/specs/react-native-modules': 'error',
  },
};
