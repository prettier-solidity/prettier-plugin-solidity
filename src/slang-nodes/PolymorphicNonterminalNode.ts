import { SlangNode } from './SlangNode.js';

import type {
  CollectedMetadata,
  SlangPolymorphicNonterminalNode
} from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export abstract class PolymorphicNonterminalNode<
  A extends SlangPolymorphicNonterminalNode,
  V extends PrintableNode
> extends SlangNode {
  variant: V;

  protected constructor(
    ast: A,
    collected: CollectedMetadata,
    createVariant: (variant: A['variant'], collected: CollectedMetadata) => V
  ) {
    super(ast, collected);

    this.variant = createVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
