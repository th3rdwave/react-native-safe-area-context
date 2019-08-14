module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@th3rdwave/safe-area-view': './',
        },
        cwd: 'babelrc',
      },
    ],
  ],
};
