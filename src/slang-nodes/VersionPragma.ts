import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VersionPragma implements SlangNode {
  readonly kind = NonterminalKind.VersionPragma;

  comments;

  loc;

  sets: VersionExpressionSets;

  constructor(ast: ast.VersionPragma) {
    const metadata = getNodeMetadata(ast);

    this.sets = new VersionExpressionSets(ast.sets);

    [this.loc, this.comments] = updateMetadata(metadata, [this.sets]);
  }

  print(path: AstPath<VersionPragma>, print: PrintFunction): Doc {
    return ['solidity ', path.call(print, 'sets')];
  }
}
