import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

export class DoWhileStatement extends SlangNode {
  get kind() {
    return NonterminalKind.DoWhileStatement;
  }

  doKeyword;

  body;

  whileKeyword;

  openParen;

  condition;

  closeParen;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      doKeyword: ast.doKeyword.text,
      body: new Statement(ast.body, offsets[0], options),
      whileKeyword: ast.whileKeyword.text,
      openParen: ast.openParen.text,
      condition: new Expression(ast.condition, offsets[1], options),
      closeParen: ast.closeParen.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      this.doKeyword,
      this.body.variant.kind === 'Block'
        ? [' ', path.call(print, 'body'), ' ']
        : group([indent([line, path.call(print, 'body')]), line]),
      `${this.whileKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      `${this.closeParen}${this.semicolon}`
    ];
  }
}
