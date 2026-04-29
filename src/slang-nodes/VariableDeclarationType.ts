import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { PolymorphicNode } from './PolymorphicNode.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class VariableDeclarationType extends PolymorphicNode<
  ast.VariableDeclarationType,
  TypeName['variant'] | TerminalNode
> {
  readonly kind = NonterminalKind.VariableDeclarationType;

  constructor(ast: ast.VariableDeclarationType, collected: CollectedMetadata) {
    super(ast, collected, (variant) =>
      extractVariant(new TypeName(variant, collected))
    );
  }
}
