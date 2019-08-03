const {
  doc: {
    builders: { group, line, concat, indent }
  }
} = require('prettier');

const groupIfNecessaryBuilder = path => doc =>
  path.getParentNode().type === 'BinaryOperation' ? doc : group(doc);

const indentIfNecessaryBuilder = path => doc => {
  const parentNode = path.getParentNode();

  if (parentNode.type === 'IfStatement') return doc;
  if (parentNode.type === 'WhileStatement') return doc;
  if (parentNode.type === 'BinaryOperation') return doc;

  return indent(doc);
};

module.exports = {
  match: op => ['&&', '||'].includes(op),
  print: (node, path, print) => {
    const groupIfNecessary = groupIfNecessaryBuilder(path);
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    return groupIfNecessary(
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
