import {
  TerminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type { Doc } from 'prettier';

export class TerminalNode extends SlangNode {
  kind: TerminalKind;

  value: string;

  constructor(ast: SlangTerminalNode) {
    super(ast);

    this.kind = ast.kind;
    this.value = ast.unparse();
  }

  print(): Doc {
    return this.value;
  }
}
