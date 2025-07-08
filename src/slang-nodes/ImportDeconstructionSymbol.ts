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

  constructor(ast: ast.ImportDeconstructionSymbol) {
    const metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias);
    }

    [this.loc, this.comments] = updateMetadata(metadata, [this.alias]);
  }

  print(path: AstPath<ImportDeconstructionSymbol>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'alias')];
  }
}
