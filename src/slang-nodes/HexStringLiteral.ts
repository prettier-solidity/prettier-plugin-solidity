import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printString } from '../slang-printers/print-string.js';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class HexStringLiteral extends PolymorphicString {
  readonly kind = NonterminalKind.HexStringLiteral;

  constructor(ast: ast.HexStringLiteral, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (raw) => `hex${printString(raw.slice(4, -1), collected.options)}`
    );
  }
}
