import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class UnicodeStringLiteral extends SlangNode {
  readonly kind = NonterminalKind.UnicodeStringLiteral;

  variant: string;

  constructor(ast: ast.UnicodeStringLiteral, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = ast.variant.unparse();

    this.variant = `unicode${printString(this.variant.slice(8, -1), collected.options)}`;
  }

  print(): Doc {
    return this.variant;
  }
}
