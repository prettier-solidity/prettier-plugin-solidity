import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class HexStringLiteral extends SlangNode {
  readonly kind = NonterminalKind.HexStringLiteral;

  variant: string;

  constructor(
    ast: ast.HexStringLiteral,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = ast.variant.unparse();

    this.variant = `hex${printString(this.variant.slice(4, -1), options)}`;
  }

  print(): Doc {
    return this.variant;
  }
}
