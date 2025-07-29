import { SlangNode } from './SlangNode.js';

import type { SlangAstNode } from '../types.d.ts';

export class PolymorphicNode extends SlangNode {
  constructor(ast: SlangAstNode) {
    super(ast);
  }
}
