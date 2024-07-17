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

    const fetch = (childrenOffsets) => {
      const { ifKeyword, openParen, condition, closeParen, body, elseBranch } =
        ast;
      this.ifKeyword = ifKeyword.text;
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
      if (elseBranch) {
        this.elseBranch = new ElseBranch(
          elseBranch,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
    };

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
