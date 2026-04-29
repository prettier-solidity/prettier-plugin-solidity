import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { PolymorphicNode } from './PolymorphicNode.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class UsingTarget extends PolymorphicNode<
  ast.UsingTarget,
  TypeName['variant'] | TerminalNode
> {
  readonly kind = NonterminalKind.UsingTarget;

  constructor(ast: ast.UsingTarget, collected: CollectedMetadata) {
    super(ast, collected, (variant) =>
      extractVariant(new TypeName(variant, collected))
    );
  }
}
