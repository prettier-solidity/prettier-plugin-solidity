import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { CallOptions } from './CallOptions.js';

export class CallOptionsExpression extends SlangNode {
  get kind() {
    return NonterminalKind.CallOptionsExpression;
  }

  operand;

  openBrace;

  options;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      operand: new Expression(ast.operand, offsets[0], options),
      openBrace: ast.openBrace.text,
      options: new CallOptions(ast.options, offsets[1], options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openBrace,
      path.call(print, 'options'),
      this.closeBrace
    ];
  }
}
