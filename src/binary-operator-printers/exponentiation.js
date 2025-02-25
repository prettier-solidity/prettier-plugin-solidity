import { doc } from 'prettier';
import { indentIfNecessaryBuilder } from './arithmetic.js';
import { rightOperand } from './right-operand.js';

const { group } = doc.builders;

export const exponentiation = {
  match: (op) => op === '**',
  print: (node, path, print, options) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);
    const right = rightOperand(node, path, print, options);
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
