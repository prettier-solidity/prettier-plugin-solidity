const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const initialValue = (node, path, print) =>
  node.initialValue ? concat([' = ', path.call(print, 'initialValue')]) : '';

const StateVariableDeclaration = {
  print: ({ node, path, print }) =>
    concat([
      ...path.map(print, 'variables'),
      initialValue(node, path, print),
      ';'
    ])
};

module.exports = StateVariableDeclaration;
