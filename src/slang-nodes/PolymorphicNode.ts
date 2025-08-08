import { SlangNode } from './SlangNode.js';

import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangAstNode } from '../types.d.ts';
import type { StrictPolymorphicNode } from './types.js';

export abstract class PolymorphicNode extends SlangNode {
  abstract variant: StrictPolymorphicNode['variant'];

  constructor(ast: SlangAstNode) {
    super(ast);
  }

  print(path: AstPath<PolymorphicNode>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
