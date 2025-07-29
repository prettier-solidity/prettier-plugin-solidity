const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class ImportDeconstructionSymbol extends SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbol;

  name: Identifier;

  alias?: ImportAlias;

  constructor(ast: ast.ImportDeconstructionSymbol) {
    super(ast);

    this.name = new Identifier(ast.name);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias);
    }

    this.updateMetadata(this.alias);
  }

  print(path: AstPath<ImportDeconstructionSymbol>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'alias')];
  }
}
