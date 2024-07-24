module.exports = {
  project: {
    macos: {
      sourceDir: './macos',
    },
  },
  dependency: {
    // https://github.com/react-native-community/cli/blob/main/docs/platforms.md#platform-interface
    platforms: {
      ios: {},
      android: {},
      macos: null,
      windows: null,
    },
  },
};
