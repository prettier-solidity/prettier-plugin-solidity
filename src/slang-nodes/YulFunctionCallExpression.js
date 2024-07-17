import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

export class YulFunctionCallExpression extends SlangNode {
  operand;

  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operand: new YulExpression(
        ast.operand,
        childrenOffsets.shift(),
        comments,
        options
      ),
      openParen: ast.openParen.text,
      arguments: new YulArguments(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openParen,
      path.call(print, 'arguments'),
      this.closeParen
    ];
  }
}
