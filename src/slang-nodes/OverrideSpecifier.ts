import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class OverrideSpecifier extends SlangNode {
  readonly kind = NonterminalKind.OverrideSpecifier;

  overridden?: OverridePathsDeclaration;

  constructor(ast: ast.OverrideSpecifier, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.overridden) {
      this.overridden = new OverridePathsDeclaration(ast.overridden, collected);
    }

    this.updateMetadata(this.overridden);
  }

  print(print: PrintFunction): Doc {
    return ['override', this.overridden ? print('overridden') : ''];
  }
}
