/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');

module.exports = (config) => {
  return {
    ...config,
    plugins: [...(config.plugins || []), ignoreMissingOptionalDependencies()],
  };
};

function ignoreMissingOptionalDependencies() {
  return new webpack.IgnorePlugin({
    checkResource(resource) {
      if (resource.startsWith('.') || resource.startsWith('src')) {
        return false;
      }

      try {
        require.resolve(resource);
        return false;
      } catch {
        return true;
      }
    },
  });
}
