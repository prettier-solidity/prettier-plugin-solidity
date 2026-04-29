import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type {
  CollectedMetadata,
  SlangPolymorphicTerminalNode
} from '../types.d.ts';

export abstract class PolymorphicTerminalNode extends SlangNode {
  variant: TerminalNode;

  protected constructor(
    ast: SlangPolymorphicTerminalNode,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.variant = new TerminalNode(ast.variant, collected);
  }
}
