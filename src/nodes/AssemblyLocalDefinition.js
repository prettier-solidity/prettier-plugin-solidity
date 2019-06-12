const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const AssemblyLocalDefinition = {
  print: ({ path, print }) =>
    join(' ', [
      'let',
      join(', ', path.map(print, 'names')),
      ':=',
      path.call(print, 'expression')
    ])
};

module.exports = AssemblyLocalDefinition;
