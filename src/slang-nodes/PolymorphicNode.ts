import { TerminalNode as SlangTerminalNode } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type { CollectedMetadata, SlangPolymorphicNode } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export abstract class PolymorphicNode<
  A extends SlangPolymorphicNode,
  V extends PrintableNode | TerminalNode
> extends SlangNode {
  variant: V;

  protected constructor(
    ast: A,
    collected: CollectedMetadata,
    createNonterminalVariant: (
      variant: Exclude<A['variant'], SlangTerminalNode>,
      collected: CollectedMetadata
    ) => V
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected) as V;
      return;
    }
    this.variant = createNonterminalVariant(
      variant as Exclude<A['variant'], SlangTerminalNode>,
      collected
    );

    this.updateMetadata(this.variant);
  }
}
