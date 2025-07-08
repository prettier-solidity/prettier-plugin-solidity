import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class OverrideSpecifier extends SlangNode {
  readonly kind = NonterminalKind.OverrideSpecifier;

  overridden?: OverridePathsDeclaration;

  constructor(ast: ast.OverrideSpecifier) {
    super(ast);

    if (ast.overridden) {
      this.overridden = new OverridePathsDeclaration(ast.overridden);
    }

    this.updateMetadata(this.overridden);
  }

  print(path: AstPath<OverrideSpecifier>, print: PrintFunction): Doc {
    return ['override', path.call(print, 'overridden')];
  }
}
