import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class ImportDeconstructionSymbol implements SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbol;

  comments;

  loc;

  name: string;

  alias?: ImportAlias;

  constructor(ast: ast.ImportDeconstructionSymbol, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name.text;
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias, offsets[0]);
    }

    metadata = updateMetadata(metadata, [this.alias]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
