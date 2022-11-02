const AssemblyStackAssignment = {
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    ' =: ',
    node.name
  ]
};

module.exports = AssemblyStackAssignment;
