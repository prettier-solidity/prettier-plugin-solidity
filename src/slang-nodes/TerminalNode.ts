import { SlangNode } from './SlangNode.js';

import type {
  TerminalNode as SlangTerminalNode,
  TerminalKind
} from '@nomicfoundation/slang/cst';
import type { Doc } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';

export class TerminalNode extends SlangNode {
  kind: TerminalKind;

  value: string;

  constructor(ast: SlangTerminalNode, collected: CollectedMetadata) {
    super(ast, collected);

    this.kind = ast.kind;
    this.value = ast.unparse();
  }

  print(): Doc {
    return this.value;
  }
}
