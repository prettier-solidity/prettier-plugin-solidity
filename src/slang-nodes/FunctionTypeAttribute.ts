import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class FunctionTypeAttribute extends SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttribute;

  variant: TerminalNode;

  constructor(ast: ast.FunctionTypeAttribute) {
    super(ast);

    this.variant = new TerminalNode(ast.variant);
  }
}
