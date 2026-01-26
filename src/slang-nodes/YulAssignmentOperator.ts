import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulColonAndEqual } from './YulColonAndEqual.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class YulAssignmentOperator extends SlangNode {
  readonly kind = NonterminalKind.YulAssignmentOperator;

  variant: YulColonAndEqual | TerminalNode;

  constructor(ast: ast.YulAssignmentOperator, options: ParserOptions<AstNode>) {
    super(ast, options);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, options);
      return;
    }
    this.variant = new YulColonAndEqual(variant, options);

    this.updateMetadata(this.variant);
  }
}
