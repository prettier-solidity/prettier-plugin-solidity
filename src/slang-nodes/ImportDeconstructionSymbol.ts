import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ImportDeconstructionSymbol implements SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbol;

  comments;

  loc;

  name: Identifier;

  alias?: ImportAlias;

  constructor(ast: ast.ImportDeconstructionSymbol, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new Identifier(ast.name, offsets[0]);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias, offsets[1]);
    }

    metadata = updateMetadata(metadata, [this.alias]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ImportDeconstructionSymbol>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'alias')];
  }
}
