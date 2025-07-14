import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulEqualAndColon } from './YulEqualAndColon.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class YulStackAssignmentOperator extends SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentOperator;

  variant: YulEqualAndColon | TerminalNode;

  constructor(ast: ast.YulStackAssignmentOperator) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new YulEqualAndColon(variant);

    this.updateMetadata(this.variant);
  }
}
