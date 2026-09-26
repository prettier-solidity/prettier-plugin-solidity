import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.ts';
import { Block } from './Block.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class FunctionBody extends SlangNode {
  readonly kind = NonterminalKind.FunctionBody;

  variant: Block | TerminalNode;

  constructor(ast: ast.FunctionBody, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = new Block(variant, collected);

    this.updateMetadata(this.variant);
  }
}
