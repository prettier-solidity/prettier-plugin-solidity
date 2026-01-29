import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AddressType } from './AddressType.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class ElementaryType extends SlangNode {
  readonly kind = NonterminalKind.ElementaryType;

  variant: AddressType | TerminalNode;

  constructor(ast: ast.ElementaryType, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = new AddressType(variant, collected);

    this.updateMetadata(this.variant);
  }
}
