import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { OverridePaths } from './OverridePaths.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class OverridePathsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.OverridePathsDeclaration;

  comments;

  loc;

  paths: OverridePaths;

  constructor(ast: ast.OverridePathsDeclaration) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.paths = new OverridePaths(ast.paths);

    updateMetadata(this.loc, this.comments, [this.paths]);
  }

  print(path: AstPath<OverridePathsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'paths'), ')'];
  }
}
