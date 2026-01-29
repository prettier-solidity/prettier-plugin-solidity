import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class UnicodeStringLiteral extends SlangNode {
  readonly kind = NonterminalKind.UnicodeStringLiteral;

  variant: string;

  constructor(
    ast: ast.UnicodeStringLiteral,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = ast.variant.unparse();

    this.variant = `unicode${printString(this.variant.slice(8, -1), options)}`;
  }

  print(): Doc {
    return this.variant;
  }
}
