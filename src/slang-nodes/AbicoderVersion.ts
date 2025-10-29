import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class AbicoderVersion extends SlangNode {
  readonly kind = NonterminalKind.AbicoderVersion;

  variant: string;

  constructor(ast: ast.AbicoderVersion) {
    super(ast);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
