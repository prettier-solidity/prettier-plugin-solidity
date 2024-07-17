import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

const { group, indent, line } = doc.builders;

export class WhileStatement extends SlangNode {
  whileKeyword;

  openParen;

  condition;

  closeParen;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      whileKeyword: ast.whileKeyword.text,
      openParen: ast.openParen.text,
      condition: new Expression(
        ast.condition,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text,
      body: new Statement(ast.body, childrenOffsets.shift(), comments, options)
    });

    this.initialize(ast, offset, fetch, comments);
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
