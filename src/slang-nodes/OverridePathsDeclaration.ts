import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { OverridePaths } from './OverridePaths.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class OverridePathsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.OverridePathsDeclaration;

  paths: OverridePaths;

  constructor(ast: ast.OverridePathsDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.paths = new OverridePaths(ast.paths, collected);

    this.updateMetadata(this.paths);
  }

  print(path: AstPath<OverridePathsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'paths'), ')'];
  }
}
