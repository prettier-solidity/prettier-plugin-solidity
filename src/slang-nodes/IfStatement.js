import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';
import { ElseBranch } from './ElseBranch.js';

const { group, hardline, indent, line } = doc.builders;

export class IfStatement extends SlangNode {
  get kind() {
    return NonterminalKind.IfStatement;
  }

  ifKeyword;

  openParen;

  condition;

  closeParen;

  body;

  elseBranch;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      ifKeyword: ast.ifKeyword.text,
      openParen: ast.openParen.text,
      condition: new Expression(
        ast.condition,
        childrenOffsets.shift(),
        options
      ),
      closeParen: ast.closeParen.text,
      body: new Statement(ast.body, childrenOffsets.shift(), options),
      elseBranch: ast.elseBranch
        ? new ElseBranch(ast.elseBranch, childrenOffsets.shift(), options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
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
