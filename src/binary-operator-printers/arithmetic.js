const {
  doc: {
    builders: { group, line, concat, indent }
  }
} = require('prettier');
const comparison = require('./comparison.js');

const groupIfNecessaryBuilder = path => doc => {
  const parentNode = path.getParentNode();
  if (
    parentNode.type === 'BinaryOperation' &&
    !comparison.match(parentNode.operator)
  ) {
    return doc;
  }
  return group(doc);
};

const indentIfNecessaryBuilder = path => doc => {
  const parentNode = path.getParentNode();
  if (
    parentNode.type === 'BinaryOperation' &&
    !comparison.match(parentNode.operator)
  ) {
    return doc;
  }
  return indent(doc);
};

module.exports = {
  match: op => ['+', '-', '*', '/', '**', '%'].includes(op),
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
