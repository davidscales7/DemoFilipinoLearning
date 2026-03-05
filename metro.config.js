const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'mjs'];

config.resolver.blockList = [
  /node_modules\/@react-native\/debugger-frontend\/.*/,
  /node_modules\/react-devtools-core\/.*/,
];

// Force transform ALL node_modules for web
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;