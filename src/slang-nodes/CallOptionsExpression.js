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

    const fetch = (childrenOffsets) => {
      const { operand, openBrace, closeBrace } = ast;
      this.operand = new Expression(
        operand,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.openBrace = openBrace.text;
      this.options = new CallOptions(
        ast.options,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeBrace = closeBrace.text;
    };

    this.initialize(ast, offset, comments, fetch);
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
