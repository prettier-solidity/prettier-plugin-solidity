/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const EmitStatement = (node, path, options, print) =>
  concat(['emit ', path.call(print, 'eventCall'), ';']);

module.exports = EmitStatement;
