/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const PragmaDirective = node =>
  concat(['pragma ', node.name, ' ', node.value, ';']);

module.exports = PragmaDirective;
