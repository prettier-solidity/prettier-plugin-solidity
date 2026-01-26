import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AddressType } from './AddressType.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class ElementaryType extends SlangNode {
  readonly kind = NonterminalKind.ElementaryType;

  variant: AddressType | TerminalNode;

  constructor(ast: ast.ElementaryType, options: ParserOptions<AstNode>) {
    super(ast, options);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, options);
      return;
    }
    this.variant = new AddressType(variant, options);

    this.updateMetadata(this.variant);
  }
}
