import { doc } from 'prettier';
import { getNode } from '../common/backward-compatibility.js';

const { group, indent, line } = doc.builders;

const indentIfNecessaryBuilder = (path) => (document) => {
  let node = getNode(path);
  for (let i = 0; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (parentNode.type === 'ReturnStatement') break;
    if (parentNode.type === 'IfStatement') break;
    if (parentNode.type === 'ForStatement') break;
    if (parentNode.type === 'WhileStatement') break;
    if (parentNode.type !== 'BinaryOperation') return indent(document);
    if (node === parentNode.right) break;
    node = parentNode;
  }
  return document;
};

export const comparison = {
  operators: ['<', '>', '<=', '>=', '==', '!='],
  print: ({ node, path, print }) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    const right = [node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return group([
      path.call(print, 'left'),
      ' ',
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
};
