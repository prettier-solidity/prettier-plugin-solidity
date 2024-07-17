import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

export class DoWhileStatement extends SlangNode {
  doKeyword;

  body;

  whileKeyword;

  openParen;

  condition;

  closeParen;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      doKeyword: ast.doKeyword.text,
      body: new Statement(ast.body, childrenOffsets.shift(), comments, options),
      whileKeyword: ast.whileKeyword.text,
      openParen: ast.openParen.text,
      condition: new Expression(
        ast.condition,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
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
