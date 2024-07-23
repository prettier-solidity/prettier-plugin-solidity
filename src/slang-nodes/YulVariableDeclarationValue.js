import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulVariableDeclarationValue extends SlangNode {
  get kind() {
    return NonterminalKind.YulVariableDeclarationValue;
  }

  assignment;

  expression;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      assignment: new YulAssignmentOperator(
        ast.assignment,
        offsets[0],
        options
      ),
      expression: new YulExpression(ast.expression, offsets[1], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
