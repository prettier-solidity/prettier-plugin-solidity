const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const AssemblyLocalDefinition = (node, path, options, print) => {
  return join(' ', [
    'let',
    join(', ', path.map(print, 'names')),
    ':=',
    path.call(print, 'expression')
  ]);
};

module.exports = AssemblyLocalDefinition;
