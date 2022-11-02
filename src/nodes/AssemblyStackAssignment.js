const AssemblyAssignment = {
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    ' =: ',
    node.name
  ]
};

module.exports = AssemblyAssignment;
