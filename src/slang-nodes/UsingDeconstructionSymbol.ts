import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingAlias } from './UsingAlias.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { SlangNode } from '../types.js';

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

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
