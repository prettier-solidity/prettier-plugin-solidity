import { doc } from 'prettier';
import { indentIfNecessaryBuilder } from './arithmetic.js';

const { group, line } = doc.builders;

export const exponentiation = {
  match: (op) => op === '**',
  print: (node, path, print) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);
    const right = [' ', node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return group([
      path.call(print, 'left'),
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
};
