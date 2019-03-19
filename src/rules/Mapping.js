/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const Mapping = (node, path, options, print) =>
  concat([
    'mapping(',
    path.call(print, 'keyType'),
    ' => ',
    path.call(print, 'valueType'),
    ')'
  ]);

module.exports = Mapping;
