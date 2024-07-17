import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';
import { ElseBranch } from './ElseBranch.js';

const { group, hardline, indent, line } = doc.builders;

export class IfStatement extends SlangNode {
  ifKeyword;

  openParen;

  condition;

  closeParen;

  body;

  elseBranch;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      ifKeyword: ast.ifKeyword.text,
      openParen: ast.openParen.text,
      condition: new Expression(
        ast.condition,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text,
      body: new Statement(ast.body, childrenOffsets.shift(), comments, options),
      elseBranch: ast.elseBranch
        ? new ElseBranch(
            ast.elseBranch,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.ifKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      this.closeParen,
      this.body.variant.kind === 'Block'
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]), {
            shouldBreak: this.body.variant.kind === 'IfStatement' // `if` within `if`
          }),
      this.elseBranch
        ? [
            this.body.variant.kind !== 'Block'
              ? hardline // else on a new line if body is not a block
              : ' ',
            path.call(print, 'elseBranch')
          ]
        : ''
    ];
  }
}
