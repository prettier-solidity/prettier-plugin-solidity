import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class OverrideSpecifier extends SlangNode {
  readonly kind = NonterminalKind.OverrideSpecifier;

  overridden?: OverridePathsDeclaration;

  constructor(ast: ast.OverrideSpecifier, options: ParserOptions<AstNode>) {
    super(ast, options);

    if (ast.overridden) {
      this.overridden = new OverridePathsDeclaration(ast.overridden, options);
    }

    this.updateMetadata(this.overridden);
  }

  print(path: AstPath<OverrideSpecifier>, print: PrintFunction): Doc {
    return ['override', path.call(print, 'overridden')];
  }
}
