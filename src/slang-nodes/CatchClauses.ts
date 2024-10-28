import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { CatchClause } from './CatchClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join } = doc.builders;

export class CatchClauses implements SlangNode {
  readonly kind = NonterminalKind.CatchClauses;

  comments;

  loc;

  items: CatchClause[];

  constructor(ast: ast.CatchClauses, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new CatchClause(item, options));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<CatchClauses>, print: PrintFunction): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
