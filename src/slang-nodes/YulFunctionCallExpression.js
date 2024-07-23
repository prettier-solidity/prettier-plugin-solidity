import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

export class YulFunctionCallExpression extends SlangNode {
  get kind() {
    return NonterminalKind.YulFunctionCallExpression;
  }

  operand;

  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      operand: new YulExpression(ast.operand, offsets[0], options),
      openParen: ast.openParen.text,
      arguments: new YulArguments(ast.arguments, offsets[1], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
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
