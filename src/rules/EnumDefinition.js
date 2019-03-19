const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const EnumDefinition = (node, path, options, print) =>
  concat([
    'enum ',
    node.name,
    ' {',
    join(', ', path.map(print, 'members')),
    '}'
  ]);

module.exports = EnumDefinition;
