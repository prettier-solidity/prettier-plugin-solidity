import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class ExpressionStatement extends SlangNode {
  expression;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      expression: new Expression(
        ast.expression,
        childrenOffsets.shift(),
        comments,
        options
      ),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [path.call(print, 'expression'), this.semicolon];
  }
}
