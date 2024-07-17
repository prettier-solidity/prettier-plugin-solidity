import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { CallOptions } from './CallOptions.js';

export class CallOptionsExpression extends SlangNode {
  operand;

  openBrace;

  options;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operand: new Expression(ast.operand, childrenOffsets.shift(), options),
      openBrace: ast.openBrace.text,
      options: new CallOptions(ast.options, childrenOffsets.shift(), options),
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
