import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

export class VersionRange extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new VersionExpression(
        ast.leftOperand,
        childrenOffsets.shift(),
        comments,
        options
      ),
      operator: ast.operator.text,
      rightOperand: new VersionExpression(
        ast.rightOperand,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: VersionRange'];
  }
}
