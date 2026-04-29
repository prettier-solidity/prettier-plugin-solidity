import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class AbicoderVersion extends PolymorphicString {
  readonly kind = NonterminalKind.AbicoderVersion;

  constructor(ast: ast.AbicoderVersion, collected: CollectedMetadata) {
    super(ast, collected);
  }
}
