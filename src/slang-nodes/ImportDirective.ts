import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ImportClause } from './ImportClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ImportDirective extends SlangNode {
  readonly kind = NonterminalKind.ImportDirective;

  clause: ImportClause;

  constructor(ast: ast.ImportDirective, options: ParserOptions<AstNode>) {
    super(ast);

    this.clause = new ImportClause(ast.clause, options);

    this.updateMetadata(this.clause);
  }

  print(path: AstPath<ImportDirective>, print: PrintFunction): Doc {
    return ['import ', path.call(printVariant(print), 'clause'), ';'];
  }
}
