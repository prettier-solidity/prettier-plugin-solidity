import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { group, indent, line } = doc.builders;

export class WhileStatement implements SlangNode {
  readonly kind = NonterminalKind.WhileStatement;

  comments;

  loc;

  whileKeyword: string;

  openParen: string;

  condition: Expression;

  closeParen: string;

  body: Statement;

  constructor(ast: ast.WhileStatement, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.whileKeyword = ast.whileKeyword.text;
    this.openParen = ast.openParen.text;
    this.condition = new Expression(ast.condition, offsets[0], options);
    this.closeParen = ast.closeParen.text;
    this.body = new Statement(ast.body, offsets[1], options);

    metadata = updateMetadata(metadata, [this.condition, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
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
