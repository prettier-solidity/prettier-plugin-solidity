import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ImportAlias } from './ImportAlias.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ImportDeconstructionSymbol extends SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbol;

  name: TerminalNode;

  alias?: ImportAlias;

  constructor(
    ast: ast.ImportDeconstructionSymbol,
    options: ParserOptions<AstNode>
  ) {
    super(ast, options);

    this.name = new TerminalNode(ast.name, options);
    if (ast.alias) {
      this.alias = new ImportAlias(ast.alias, options);
    }

    this.updateMetadata(this.alias);
  }

  print(path: AstPath<ImportDeconstructionSymbol>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), path.call(print, 'alias')];
  }
}
