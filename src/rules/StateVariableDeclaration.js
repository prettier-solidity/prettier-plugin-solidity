const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const StateVariableDeclaration = (node, path, options, print) => {
  let doc = concat(
    path.map(statementPath => {
      if (!statementPath.getValue()) {
        return ', ';
      }
      return print(statementPath);
    }, 'variables')
  );
  if (node.initialValue) {
    doc = concat([doc, ' = ', path.call(print, 'initialValue')]);
  }
  return concat([doc, ';']);
};

module.exports = StateVariableDeclaration;
