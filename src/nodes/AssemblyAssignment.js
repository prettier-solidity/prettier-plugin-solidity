const {
  doc: {
    builders: { join }
  }
} = require('prettier/standalone');

const AssemblyAssignment = {
  print: ({ path, print }) =>
    join(' ', [
      join(', ', path.map(print, 'names')),
      ':=',
      path.call(print, 'expression')
    ])
};

module.exports = AssemblyAssignment;
