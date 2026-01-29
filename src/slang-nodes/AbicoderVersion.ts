import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class AbicoderVersion extends SlangNode {
  readonly kind = NonterminalKind.AbicoderVersion;

  variant: string;

  constructor(ast: ast.AbicoderVersion, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
