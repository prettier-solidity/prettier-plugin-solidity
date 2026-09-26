import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.ts';
import { OverridePaths } from './OverridePaths.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class OverridePathsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.OverridePathsDeclaration;

  paths: OverridePaths;

  constructor(ast: ast.OverridePathsDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.paths = new OverridePaths(ast.paths, collected);

    this.updateMetadata(this.paths);
  }

  print(print: PrintFunction): Doc {
    return ['(', print('paths'), ')'];
  }
}
