import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';
import { ElseBranch } from './ElseBranch.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const { group, hardline, indent, line } = doc.builders;

export class IfStatement implements SlangNode {
  readonly kind = NonterminalKind.IfStatement;

  comments;

  loc;

  condition: Expression;

  body: Statement;

  elseBranch?: ElseBranch;

  constructor(
    ast: ast.IfStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.condition = new Expression(ast.condition, offsets[0], options);
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

  print(path: AstPath<IfStatement>, print: PrintFunction): Doc {
    return [
      'if (',
      printSeparatedItem(path.call(print, 'condition')),
      ')',
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
