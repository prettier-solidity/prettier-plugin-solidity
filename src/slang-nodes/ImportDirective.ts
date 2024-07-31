import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportClause } from './ImportClause.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class ImportDirective implements SlangNode {
  readonly kind = NonterminalKind.ImportDirective;

  comments;

  loc;

  importKeyword: string;

  clause: ImportClause;

  semicolon: string;

  constructor(
    ast: ast.ImportDirective,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.importKeyword = ast.importKeyword.text;
    this.clause = new ImportClause(ast.clause, offsets[0], options);
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.clause]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.importKeyword} `,
      path.call(print, 'clause'),
      this.semicolon
    ];
  }
}
