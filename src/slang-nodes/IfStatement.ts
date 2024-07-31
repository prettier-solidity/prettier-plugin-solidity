import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';
import { ElseBranch } from './ElseBranch.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { group, hardline, indent, line } = doc.builders;

export class IfStatement implements SlangNode {
  readonly kind = NonterminalKind.IfStatement;

  comments;

  loc;

  ifKeyword: string;

  openParen: string;

  condition: Expression;

  closeParen: string;

  body: Statement;

  elseBranch?: ElseBranch;

  constructor(
    ast: ast.IfStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.ifKeyword = ast.ifKeyword.text;
    this.openParen = ast.openParen.text;
    this.condition = new Expression(ast.condition, offsets[0], options);
    this.closeParen = ast.closeParen.text;
    this.body = new Statement(ast.body, offsets[1], options);
    if (ast.elseBranch) {
      this.elseBranch = new ElseBranch(ast.elseBranch, offsets[2], options);
    }

    metadata = updateMetadata(metadata, [
      this.condition,
      this.body,
      this.elseBranch
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.ifKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      this.closeParen,
      this.body.variant.kind === NonterminalKind.Block
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]), {
            shouldBreak: this.body.variant.kind === NonterminalKind.IfStatement // `if` within `if`
          }),
      this.elseBranch
        ? [
            this.body.variant.kind !== NonterminalKind.Block
              ? hardline // else on a new line if body is not a block
              : ' ',
            path.call(print, 'elseBranch')
          ]
        : ''
    ];
  }
}
