import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulVariableDeclarationValue extends SlangNode {
  assignment;

  expression;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => ({
      assignment: new YulAssignmentOperator(
        ast.assignment,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      ),
      expression: new YulExpression(
        ast.expression,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
