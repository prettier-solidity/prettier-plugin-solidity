const {
  doc: {
    builders: { group, line, concat, indent }
  }
} = require('prettier/standalone');

const indentIfNecessaryBuilder = path => doc => {
  const parentNode = path.getParentNode();

  if (parentNode.type === 'IfStatement') return doc;
  if (parentNode.type === 'ForStatement') return doc;
  if (parentNode.type === 'WhileStatement') return doc;
  if (parentNode.type === 'BinaryOperation') return doc;
  if (parentNode.type === 'StateVariableDeclaration') return doc;
  if (parentNode.type === 'VariableDeclarationStatement') return doc;

  return indent(doc);
};

module.exports = {
  match: op => ['<', '>', '<=', '>=', '==', '!='].includes(op),
  print: (node, path, print) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    return group(
      indentIfNecessary(
        concat([
          path.call(print, 'left'),
          ' ',
          node.operator,
          line,
          path.call(print, 'right')
        ])
      )
    );
  }
};
