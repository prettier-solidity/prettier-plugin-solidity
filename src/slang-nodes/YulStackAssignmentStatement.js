import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulStackAssignmentStatement extends SlangNode {
  assignment;

  expression;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { assignment, expression } = ast;
      this.assignment = new YulAssignmentOperator(
        assignment,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.expression = new YulExpression(
        expression,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulStackAssignmentStatement'];
  }
}
