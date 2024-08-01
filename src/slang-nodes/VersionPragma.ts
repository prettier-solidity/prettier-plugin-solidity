import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class VersionPragma implements SlangNode {
  readonly kind = NonterminalKind.VersionPragma;

  comments;

  loc;

  solidityKeyword: string;

  sets: VersionExpressionSets;

  constructor(ast: ast.VersionPragma, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.solidityKeyword = ast.solidityKeyword.text;
    this.sets = new VersionExpressionSets(ast.sets, offsets[0]);

    metadata = updateMetadata(metadata, [this.sets]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<VersionPragma>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`${this.solidityKeyword} `, path.call(print, 'sets')];
  }
}
