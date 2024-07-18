import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printComparisonOperation } from '../slang-printers/print-comparison-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class EqualityExpression extends SlangNode {
  get kind() {
    return NonterminalKind.EqualityExpression;
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
    return printComparisonOperation({ node: this, path, print, options });
  }
}
