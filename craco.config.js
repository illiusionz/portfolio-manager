const path = require('path');

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/styles/_variables";
          @import "src/styles/_mixins";
        `,
      },
    },
  },
};
