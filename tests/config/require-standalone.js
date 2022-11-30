"use strict";

const prettier = require("prettier/standalone");
const markdownPlugin = require("prettier/parser-markdown");
const babelPlugin = require("prettier/parser-babel");
const solidityPlugin = require("../../src/index");

module.exports = {
  formatWithCursor(input, options) {
    const $$$options = {
      ...options,
      plugins: [
        babelPlugin,
        markdownPlugin,
        solidityPlugin,
        ...(options.plugins || []),
      ],
    };
    return prettier.formatWithCursor(input, $$$options);
  },

  __debug: {
    parse(input, options, massage) {
      const $$$options = {
        ...options,
        plugins: [
          babelPlugin,
          markdownPlugin,
          solidityPlugin,
          ...(options.plugins || []),
        ],
      };
      return prettier.__debug.parse(input, $$$options, massage);
    },
  },
};
