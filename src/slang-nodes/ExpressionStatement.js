import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class ExpressionStatement extends SlangNode {
  expression;

  semicolon;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { expression, semicolon } = ast;
      this.expression = new Expression(
        expression,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [path.call(print, 'expression'), this.semicolon];
  }
}
