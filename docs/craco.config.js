const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Override the Webpack configuration
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: '/portfolio-manager/',
      };
      return webpackConfig;
    },
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html',
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/styles/_variables";
          @import "src/styles/_mixins";
          @import "src/styles/_typography";
        `,
      },
    },
  },
};
