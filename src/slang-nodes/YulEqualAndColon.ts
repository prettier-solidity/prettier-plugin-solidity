import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class YulEqualAndColon extends SlangNode {
  readonly kind = NonterminalKind.YulEqualAndColon;

  constructor(ast: ast.YulEqualAndColon, options: ParserOptions<AstNode>) {
    super(ast, options);
  }

  print(): Doc {
    return '=:';
  }
}
