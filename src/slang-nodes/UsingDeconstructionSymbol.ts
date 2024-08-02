import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class UsingDeconstructionSymbol implements SlangNode {
  readonly kind = NonterminalKind.UsingDeconstructionSymbol;

  comments;

  loc;

  name: IdentifierPath;

  alias?: UsingAlias;

  constructor(ast: ast.UsingDeconstructionSymbol, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new IdentifierPath(ast.name, offsets[0]);
    if (ast.alias) {
      this.alias = new UsingAlias(ast.alias, offsets[1]);
    }

    metadata = updateMetadata(metadata, [this.name, this.alias]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<UsingDeconstructionSymbol>,
    print: (path: AstPath<AstNode | undefined>) => Doc
  ): Doc {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
