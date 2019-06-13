const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const Mapping = {
  print: ({ path, print }) =>
    concat([
      'mapping(',
      path.call(print, 'keyType'),
      ' => ',
      path.call(print, 'valueType'),
      ')'
    ])
};

module.exports = Mapping;
