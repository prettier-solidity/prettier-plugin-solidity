import { doc } from 'prettier';
import { assignment } from '../assignment.js';

const { group, line } = doc.builders;

export const rightOperandPrinter = (node, path, print, options) => {
  const right =
    options.experimentalOperatorPosition === 'end'
      ? [' ', node.operator, line, path.call(print, 'right')]
      : [line, node.operator, ' ', path.call(print, 'right')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const parent = path.getParentNode();
  return node.left.type !== 'BinaryOperation' &&
    (parent.type !== 'BinaryOperation' || assignment.match(parent.operator))
    ? group(right)
    : right;
};
