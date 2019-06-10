const {
  doc: {
    builders: { join }
  }
} = require('prettier/standalone');

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
