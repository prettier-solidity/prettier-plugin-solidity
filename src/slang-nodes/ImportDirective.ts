import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportClause } from './ImportClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ImportDirective implements SlangNode {
  readonly kind = NonterminalKind.ImportDirective;

  comments;

  loc;

  clause: ImportClause;

  constructor(ast: ast.ImportDirective, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.clause = new ImportClause(ast.clause, options);

    [this.loc, this.comments] = updateMetadata(metadata, [this.clause]);
  }

  print(path: AstPath<ImportDirective>, print: PrintFunction): Doc {
    return ['import ', path.call(print, 'clause'), ';'];
  }
}
