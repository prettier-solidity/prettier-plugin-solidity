const prettier = require('prettier/standalone');
const solidityPlugin = require('../src/index');

module.exports = {
  formatWithCursor(input, options) {
    const $$$options = {
      ...options,
      plugins: [solidityPlugin, ...(options.plugins || [])]
    };
    return prettier.formatWithCursor(input, $$$options);
  },

  __debug: {
    parse(input, options, massage) {
      const $$$options = {
        ...options,
        plugins: [solidityPlugin, ...(options.plugins || [])]
      };
      return prettier.__debug.parse(input, $$$options, massage);
    }
  }
};
