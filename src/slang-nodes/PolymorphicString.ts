import { SlangNode } from './SlangNode.js';

import type { Doc } from 'prettier';
import type {
  CollectedMetadata,
  SlangPolymorphicTerminalNode
} from '../types.d.ts';

export abstract class PolymorphicString extends SlangNode {
  variant: string;

  protected constructor(
    ast: SlangPolymorphicTerminalNode,
    collected: CollectedMetadata,
    process?: (raw: string) => string
  ) {
    super(ast, collected);
    const raw = ast.variant.unparse();
    this.variant = process ? process(raw) : raw;
  }

  print(): Doc {
    return this.variant;
  }
}
