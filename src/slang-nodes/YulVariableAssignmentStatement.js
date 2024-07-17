import { SlangNode } from './SlangNode.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulVariableAssignmentStatement extends SlangNode {
  names;

  assignment;

  expression;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { names, assignment, expression } = ast;
      this.names = new YulPaths(
        names,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
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

    this.initialize(ast, offset, fetch, comments);
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
