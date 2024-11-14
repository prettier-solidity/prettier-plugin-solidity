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
    let metadata = getNodeMetadata(ast);

    this.clause = new ImportClause(ast.clause, options);

    metadata = updateMetadata(metadata, [this.clause]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ImportDirective>, print: PrintFunction): Doc {
    return ['import ', path.call(print, 'clause'), ';'];
  }
}
