import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class AndExpression extends SlangNode {
  get kind() {
    return NonterminalKind.AndExpression;
  }

  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new Expression(
        ast.leftOperand,
        childrenOffsets.shift(),
        options
      ),
      operator: ast.operator.text,
      rightOperand: new Expression(
        ast.rightOperand,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print, options) {
    return printLogicalOperation({ node: this, path, print, options });
  }
}
