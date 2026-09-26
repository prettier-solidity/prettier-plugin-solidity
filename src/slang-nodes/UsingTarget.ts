import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TypeName } from './TypeName.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class UsingTarget extends SlangNode {
  readonly kind = NonterminalKind.UsingTarget;

  variant: TypeName['variant'] | TerminalNode;

  constructor(ast: ast.UsingTarget, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = extractVariant(new TypeName(variant, collected));

    this.updateMetadata(this.variant);
  }
}
