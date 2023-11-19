import { doc } from 'prettier';

const { group, line, indent } = doc.builders;

const groupIfNecessaryBuilder = (path) => (document) =>
  path.getParentNode().type === 'BinaryOperation' ? document : group(document);

const indentIfNecessaryBuilder = (path, options) => (document) => {
  let node = path.getNode();
  for (let i = 0; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (parentNode.type === 'ReturnStatement') return document;
    if (parentNode.type === 'IfStatement') return document;
    if (parentNode.type === 'WhileStatement') return document;
    if (
      options.experimentalTernaries &&
      parentNode.type === 'Conditional' &&
      parentNode.condition === node
    )
      return document;
    if (parentNode.type !== 'BinaryOperation') return indent(document);
    if (node === parentNode.right) return document;
    node = parentNode;
  }
};

export const logical = {
  match: (op) => ['&&', '||'].includes(op),
  print: (node, path, print, options) => {
    const groupIfNecessary = groupIfNecessaryBuilder(path);
    const indentIfNecessary = indentIfNecessaryBuilder(path, options);

    const right = [node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return groupIfNecessary([
      path.call(print, 'left'),
      ' ',
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
};
