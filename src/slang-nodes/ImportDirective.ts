import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ImportClause } from './ImportClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ImportDirective extends SlangNode {
  readonly kind = NonterminalKind.ImportDirective;

  clause: ImportClause['variant'];

  constructor(ast: ast.ImportDirective, options: ParserOptions<AstNode>) {
    super(ast);

    this.clause = extractVariant(new ImportClause(ast.clause, options));

    this.updateMetadata(this.clause);
  }

  print(path: AstPath<ImportDirective>, print: PrintFunction): Doc {
    return ['import ', path.call(print, 'clause'), ';'];
  }
}
