import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class SimpleVersionLiteral extends SlangNode {
  readonly kind = NonterminalKind.SimpleVersionLiteral;

  items: string[];

  constructor(ast: ast.SimpleVersionLiteral, options: ParserOptions<AstNode>) {
    super(ast, options, true);

    this.items = ast.items.map((item) => item.unparse());
  }

  print(): Doc {
    return this.items.join('.');
  }
}
