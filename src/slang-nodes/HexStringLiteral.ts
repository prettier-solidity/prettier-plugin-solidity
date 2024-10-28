import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printString } from '../slang-printers/print-string.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { SlangNode } from '../types.d.ts';

export class HexStringLiteral implements SlangNode {
  readonly kind = NonterminalKind.HexStringLiteral;

  comments;

  loc;

  variant: string;

  constructor(ast: ast.HexStringLiteral, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.variant = ast.variant.unparse();

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.variant = `hex${printString(this.variant.slice(4, -1), options)}`;
  }

  print(): Doc {
    return this.variant;
  }
}
