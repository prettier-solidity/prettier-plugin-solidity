import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

export class VersionRange extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { leftOperand, operator, rightOperand } = ast;
      this.leftOperand = new VersionExpression(
        leftOperand,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.operator = operator.text;
      this.rightOperand = new VersionExpression(
        rightOperand,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: VersionRange'];
  }
}
