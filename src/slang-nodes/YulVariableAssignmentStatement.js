import { SlangNode } from './SlangNode.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulVariableAssignmentStatement extends SlangNode {
  names;

  assignment;

  expression;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      names: new YulPaths(ast.names, childrenOffsets.shift(), options),
      assignment: new YulAssignmentOperator(
        ast.assignment,
        childrenOffsets.shift(),
        options
      ),
      expression: new YulExpression(
        ast.expression,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'names'),
      ' ',
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
