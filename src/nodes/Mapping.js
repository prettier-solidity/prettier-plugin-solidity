const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

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
