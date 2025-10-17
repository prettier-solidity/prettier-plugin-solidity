import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class AbicoderVersion extends SlangNode {
  readonly kind = NonterminalKind.AbicoderPragma;

  variant: TerminalNode;

  constructor(ast: ast.AbicoderVersion) {
    super(ast);

    this.variant = new TerminalNode(ast.variant);
  }
}
