import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class AbicoderVersion extends SlangNode {
  readonly kind = NonterminalKind.AbicoderVersion;

  variant: string;

  constructor(ast: ast.AbicoderVersion, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variant = ast.variant.unparse();
  }

  print(): Doc {
    return this.variant;
  }
}
