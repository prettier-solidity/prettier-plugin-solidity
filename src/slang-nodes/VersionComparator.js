import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';
export class VersionComparator extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { operator, operand } = ast;
      this.operator = operator.text;
      this.operand = new VersionExpression(
        operand,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
