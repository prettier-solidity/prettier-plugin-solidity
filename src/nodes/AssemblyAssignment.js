const {
  builders: { join }
} = require('prettier/doc');

const AssemblyAssignment = {
  print: ({ path, print }) =>
    join(' ', [
      join(', ', path.map(print, 'names')),
      ':=',
      path.call(print, 'expression')
    ])
};

module.exports = AssemblyAssignment;
