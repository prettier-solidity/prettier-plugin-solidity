import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { CatchClause } from './CatchClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { join } = doc.builders;

export class CatchClauses extends SlangNode {
  readonly kind = NonterminalKind.CatchClauses;

  items: CatchClause[];

  constructor(ast: ast.CatchClauses, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new CatchClause(item, options));

    this.updateMetadata(...this.items);
  }

  print(path: AstPath<CatchClauses>, print: PrintFunction): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
