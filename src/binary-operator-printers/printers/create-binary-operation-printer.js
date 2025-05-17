import { doc } from 'prettier';
import { assignment } from '../assignment.js';

const { group, line } = doc.builders;

const rightOperandPrinter = (node, path, print) => {
  const right = [' ', node.operator, line, path.call(print, 'right')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const parent = path.getParentNode();
  return node.left.type !== 'BinaryOperation' &&
    parent.type !== 'BinaryOperation'
    ? group(right)
    : right;
};

export const createBinaryOperationPrinter =
  (groupIfNecessaryBuilder, indentIfNecessaryBuilder) =>
  (node, path, print, options) => {
    const groupIfNecessary = groupIfNecessaryBuilder(path);
    const indentIfNecessary = indentIfNecessaryBuilder(path, options);

    return groupIfNecessary([
      path.call(print, 'left'),
      indentIfNecessary(rightOperandPrinter(node, path, print))
    ]);
  };
