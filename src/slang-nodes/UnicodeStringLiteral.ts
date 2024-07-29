import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printString } from '../slang-printers/print-string.js';
import { getNodeMetadata } from '../slang-utils/get-offsets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class UnicodeStringLiteral implements SlangNode {
  readonly kind = NonterminalKind.UnicodeStringLiteral;

  comments;

  loc;

  variant: string;

  constructor(
    ast: ast.UnicodeStringLiteral,
    offset: number,
    options: ParserOptions
  ) {
    const metadata = getNodeMetadata(ast, offset);

    this.variant = ast.variant.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.variant = `unicode${printString(this.variant.slice(8, -1), options)}`;
  }

  print(): Doc {
    return this.variant;
  }
}
