import { SlangNode } from './SlangNode.js';

import type { SlangAstNode } from '../types.d.ts';
import type { PolymorphicNode as PolymorphicNodeType } from './types.d.ts';

export abstract class PolymorphicNode extends SlangNode {
  abstract variant: PolymorphicNodeType['variant'];

  constructor(ast: SlangAstNode) {
    super(ast);
  }
}
