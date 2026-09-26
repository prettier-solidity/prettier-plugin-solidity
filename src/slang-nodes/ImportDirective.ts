import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { ImportClause } from './ImportClause.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ImportDirective extends SlangNode {
  readonly kind = NonterminalKind.ImportDirective;

  clause: ImportClause['variant'];

  constructor(ast: ast.ImportDirective, collected: CollectedMetadata) {
    super(ast, collected);

    this.clause = extractVariant(new ImportClause(ast.clause, collected));

    this.updateMetadata(this.clause);
  }

  print(print: PrintFunction): Doc {
    return ['import ', print('clause'), ';'];
  }
}
