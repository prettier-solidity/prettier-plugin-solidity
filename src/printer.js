// https://prettier.io/docs/en/plugins.html#printers
const print = (path, options) =>
  `// todo: ready to prettier\n${options.originalText}`;

module.exports = print;
