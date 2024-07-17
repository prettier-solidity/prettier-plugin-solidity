import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';
export class VersionComparator extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operator: ast.operator.text,
      operand: new VersionExpression(
        ast.operand,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
