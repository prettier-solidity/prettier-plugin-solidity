import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.ts';
import { YulColonAndEqual } from './YulColonAndEqual.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class YulAssignmentOperator extends SlangNode {
  readonly kind = NonterminalKind.YulAssignmentOperator;

  variant: YulColonAndEqual | TerminalNode;

  constructor(ast: ast.YulAssignmentOperator, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = new YulColonAndEqual(variant, collected);

    this.updateMetadata(this.variant);
  }
}
