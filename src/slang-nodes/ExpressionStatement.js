import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class ExpressionStatement extends SlangNode {
  get kind() {
    return NonterminalKind.ExpressionStatement;
  }

  expression;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      expression: new Expression(
        ast.expression,
        childrenOffsets.shift(),
        options
      ),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [path.call(print, 'expression'), this.semicolon];
  }
}
