module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-native-safe-area-context': './src',
        },
      },
    ],
  ],
};
