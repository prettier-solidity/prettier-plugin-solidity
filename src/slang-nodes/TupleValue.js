import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class TupleValue extends SlangNode {
  get kind() {
    return NonterminalKind.TupleValue;
  }

  expression;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      expression: ast.expression
        ? new Expression(ast.expression, offsets[0], options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return this.expression ? path.call(print, 'expression') : '';
  }
}
