import { doc } from 'prettier';
import { getNode } from '../common/backward-compatibility.js';
import { comparison } from './comparison.js';

const { group, line, indent } = doc.builders;

const groupIfNecessaryBuilder = (path) => (document) => {
  const parentNode = path.getParentNode();
  if (
    parentNode.type === 'BinaryOperation' &&
    !comparison.operators.includes(parentNode.operator)
  ) {
    return document;
  }
  return group(document);
};

const indentIfNecessaryBuilder = (path) => (document) => {
  let node = getNode(path);
  for (let i = 0; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (parentNode.type === 'ReturnStatement') break;
    if (
      parentNode.type !== 'BinaryOperation' ||
      comparison.operators.includes(parentNode.operator)
    ) {
      return indent(document);
    }
    if (node === parentNode.right) break;
    node = parentNode;
  }
  return document;
};

export const arithmetic = {
  operators: ['+', '-', '*', '/', '%'],
  print: ({ node, path, print }) => {
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
