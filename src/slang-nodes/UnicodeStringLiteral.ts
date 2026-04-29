import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printString } from '../slang-printers/print-string.js';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class UnicodeStringLiteral extends PolymorphicString {
  readonly kind = NonterminalKind.UnicodeStringLiteral;

  constructor(ast: ast.UnicodeStringLiteral, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (raw) => `unicode${printString(raw.slice(8, -1), collected.options)}`
    );
  }
}
