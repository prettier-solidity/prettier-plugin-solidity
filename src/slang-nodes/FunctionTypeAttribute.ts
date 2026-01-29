import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class FunctionTypeAttribute extends SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttribute;

  variant: TerminalNode;

  constructor(ast: ast.FunctionTypeAttribute, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variant = new TerminalNode(ast.variant, options);
  }
}
