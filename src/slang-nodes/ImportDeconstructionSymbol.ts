import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class ImportDeconstructionSymbol extends SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbol;

  name: TerminalNode;

  alias?: ImportAlias;

  constructor(ast: ast.ImportDeconstructionSymbol) {
    super(ast);

    this.name = new TerminalNode(ast.name);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias);
    }

    this.updateMetadata(this.alias);
  }

  print(path: AstPath<ImportDeconstructionSymbol>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'alias')];
  }
}
