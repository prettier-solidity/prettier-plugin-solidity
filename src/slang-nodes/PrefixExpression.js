import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class PrefixExpression extends SlangNode {
  get kind() {
    return NonterminalKind.PrefixExpression;
  }

  operator;

  operand;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      operator: ast.operator.text,
      operand: new Expression(ast.operand, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
