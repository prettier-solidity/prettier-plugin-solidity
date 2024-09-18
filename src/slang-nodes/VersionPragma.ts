import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class VersionPragma implements SlangNode {
  readonly kind = NonterminalKind.VersionPragma;

  comments;

  loc;

  sets: VersionExpressionSets;

  constructor(ast: ast.VersionPragma, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.sets = new VersionExpressionSets(ast.sets, offsets[0]);

    metadata = updateMetadata(metadata, [this.sets]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionPragma>, print: PrintFunction): Doc {
    return ['solidity ', path.call(print, 'sets')];
  }
}
