import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulColonAndEqual } from './YulColonAndEqual.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class YulAssignmentOperator extends SlangNode {
  readonly kind = NonterminalKind.YulAssignmentOperator;

  variant: YulColonAndEqual | TerminalNode;

  constructor(ast: ast.YulAssignmentOperator) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new YulColonAndEqual(variant);

    this.updateMetadata(this.variant);
  }
}
