const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const AssemblyAssignment = (node, path, options, print) => {
  return join(' ', [
    join(', ', path.map(print, 'names')),
    ':=',
    path.call(print, 'expression')
  ]);
};

module.exports = AssemblyAssignment;
