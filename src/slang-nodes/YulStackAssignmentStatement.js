import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulStackAssignmentStatement extends SlangNode {
  assignment;

  expression;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      assignment: new YulAssignmentOperator(
        ast.assignment,
        childrenOffsets.shift(),
        comments,
        options
      ),
      expression: new YulExpression(
        ast.expression,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulStackAssignmentStatement'];
  }
}
