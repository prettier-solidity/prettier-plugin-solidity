import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class YulColonAndEqual extends SlangNode {
  readonly kind = NonterminalKind.YulColonAndEqual;

  constructor(ast: ast.YulColonAndEqual, options: ParserOptions<AstNode>) {
    super(ast, options);
  }

  print(): Doc {
    return ':=';
  }
}
