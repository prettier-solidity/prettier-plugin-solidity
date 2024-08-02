import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printString } from '../slang-printers/print-string.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class StringLiteral implements SlangNode {
  readonly kind = NonterminalKind.StringLiteral;

  comments;

  loc;

  variant;

  constructor(
    ast: ast.StringLiteral,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    const metadata = getNodeMetadata(ast, offset);

    this.variant = ast.variant.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.variant = printString(this.variant.slice(1, -1), options);
  }

  print(): Doc {
    return this.variant;
  }
}
