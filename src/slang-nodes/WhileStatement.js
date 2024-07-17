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

    const fetch = (childrenOffsets) => {
      const { whileKeyword, openParen, condition, closeParen, body } = ast;
      this.whileKeyword = whileKeyword.text;
      this.openParen = openParen.text;
      this.condition = new Expression(
        condition,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeParen = closeParen.text;
      this.body = new Statement(
        body,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

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
