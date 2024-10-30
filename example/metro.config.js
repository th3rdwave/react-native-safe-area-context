const path = require('node:path');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

module.exports = makeMetroConfig({
  watchFolders: [path.dirname(__dirname)],
  resolver: {
    resolverMainFields: ['main', 'react-native'],
    extraNodeModules: {
      'react-native-safe-area-context': path.dirname(__dirname),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
