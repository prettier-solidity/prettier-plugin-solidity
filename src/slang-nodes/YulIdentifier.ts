const { TerminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';

import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Doc } from 'prettier';

export class YulIdentifier extends SlangNode {
  readonly kind = TerminalKind.YulIdentifier;

  value: string;

  constructor(ast: TerminalNode) {
    super(ast);

    this.value = ast.unparse();
  }

  print(): Doc {
    return this.value;
  }
}
