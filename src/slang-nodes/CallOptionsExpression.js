import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { CallOptions } from './CallOptions.js';

export class CallOptionsExpression extends SlangNode {
  operand;

  openBrace;

  options;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operand: new Expression(
        ast.operand,
        childrenOffsets.shift(),
        comments,
        options
      ),
      openBrace: ast.openBrace.text,
      options: new CallOptions(
        ast.options,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch, comments);
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
