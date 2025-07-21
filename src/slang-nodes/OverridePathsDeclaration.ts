import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { OverridePaths } from './OverridePaths.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class OverridePathsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.OverridePathsDeclaration;

  paths: OverridePaths;

  constructor(ast: ast.OverridePathsDeclaration) {
    super(ast);

    this.paths = new OverridePaths(ast.paths);

    this.updateMetadata(this.paths);
  }

  print(path: AstPath<OverridePathsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'paths'), ')'];
  }
}
