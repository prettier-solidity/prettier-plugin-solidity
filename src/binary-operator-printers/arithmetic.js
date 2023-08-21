import { doc } from 'prettier';
import { comparison } from './comparison.js';

const { group, line, indent } = doc.builders;

const groupIfNecessaryBuilder = (path) => (document) => {
  const parentNode = path.getParentNode();
  if (
    parentNode.type === 'BinaryOperation' &&
    !comparison.match(parentNode.operator)
  ) {
    return document;
  }
  return group(document);
};

const indentIfNecessaryBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 0; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (parentNode.type === 'ReturnStatement') return document;
    if (
      parentNode.type !== 'BinaryOperation' ||
      comparison.match(parentNode.operator)
    ) {
      return indent(document);
    }
    if (node === parentNode.right) return document;
    node = parentNode;
  }
};

export const arithmetic = {
  match: (op) => ['+', '-', '*', '/', '%'].includes(op),
  print: (node, path, print) => {
    const groupIfNecessary = groupIfNecessaryBuilder(path);
    const indentIfNecessary = indentIfNecessaryBuilder(path);

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
