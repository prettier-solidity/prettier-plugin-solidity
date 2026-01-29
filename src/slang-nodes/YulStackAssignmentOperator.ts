import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulEqualAndColon } from './YulEqualAndColon.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class YulStackAssignmentOperator extends SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentOperator;

  variant: YulEqualAndColon | TerminalNode;

  constructor(
    ast: ast.YulStackAssignmentOperator,
    options: ParserOptions<AstNode>
  ) {
    super(ast, options);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, options);
      return;
    }
    this.variant = new YulEqualAndColon(variant, options);

    this.updateMetadata(this.variant);
  }
}
