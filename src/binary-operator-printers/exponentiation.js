import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

export const exponentiation = {
  match: (op) => op === '**',
  print: (node, path, print) => {
    const right = [' ', node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return group([
      path.call(print, 'left'),
      indent(shouldGroup ? group(right) : right)
    ]);
  }
};
