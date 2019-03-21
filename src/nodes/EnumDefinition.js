/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const EnumDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'enum ',
      node.name,
      ' {',
      join(', ', path.map(print, 'members')),
      '}'
    ])
};

module.exports = EnumDefinition;
