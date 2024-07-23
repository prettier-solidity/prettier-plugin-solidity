import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulStackAssignmentStatement extends SlangNode {
  get kind() {
    return NonterminalKind.YulStackAssignmentStatement;
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

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulStackAssignmentStatement'];
  }
}
