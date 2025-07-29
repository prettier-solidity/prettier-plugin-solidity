const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class FunctionName extends SlangNode {
  readonly kind = NonterminalKind.FunctionName;

  variant: Identifier;

  constructor(ast: ast.FunctionName) {
    super(ast);

    this.variant = new Identifier(ast.variant);
  }

  print(path: AstPath<FunctionName>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
