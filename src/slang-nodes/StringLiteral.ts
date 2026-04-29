import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printString } from '../slang-printers/print-string.js';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class StringLiteral extends PolymorphicString {
  readonly kind = NonterminalKind.StringLiteral;

  constructor(ast: ast.StringLiteral, collected: CollectedMetadata) {
    super(ast, collected, (raw) =>
      printString(raw.slice(1, -1), collected.options)
    );
  }
}
