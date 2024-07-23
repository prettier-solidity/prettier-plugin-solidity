import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

const { group, indent, line } = doc.builders;

export class WhileStatement extends SlangNode {
  get kind() {
    return NonterminalKind.WhileStatement;
  }

  whileKeyword;

  openParen;

  condition;

  closeParen;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      whileKeyword: ast.whileKeyword.text,
      openParen: ast.openParen.text,
      condition: new Expression(ast.condition, offsets[0], options),
      closeParen: ast.closeParen.text,
      body: new Statement(ast.body, offsets[1], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.whileKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      this.closeParen,
      this.body.variant.kind === 'Block'
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
}
