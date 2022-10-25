const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const AssemblyAssignment = {
  print: ({ node, path, print }) =>
    join(' ', [path.call(print, 'expression'), '=:', node.name])
};

module.exports = AssemblyAssignment;
