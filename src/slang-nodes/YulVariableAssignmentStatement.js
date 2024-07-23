import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulVariableAssignmentStatement extends SlangNode {
  get kind() {
    return NonterminalKind.YulVariableAssignmentStatement;
  }

  names;

  assignment;

  expression;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      names: new YulPaths(ast.names, offsets[0], options),
      assignment: new YulAssignmentOperator(
        ast.assignment,
        offsets[1],
        options
      ),
      expression: new YulExpression(ast.expression, offsets[2], options)
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
