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

  constructor(ast: ast.OverridePathsDeclaration, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.paths = new OverridePaths(ast.paths, offsets[0]);

    metadata = updateMetadata(metadata, [this.paths]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<OverridePathsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'paths'), ')'];
  }
}
