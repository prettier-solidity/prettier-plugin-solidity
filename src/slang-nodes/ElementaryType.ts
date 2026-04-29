import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { AddressType } from './AddressType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class ElementaryType extends PolymorphicNode<
  ast.ElementaryType,
  AddressType | TerminalNode
> {
  readonly kind = NonterminalKind.ElementaryType;

  constructor(ast: ast.ElementaryType, collected: CollectedMetadata) {
    super(ast, collected, (variant) => new AddressType(variant, collected));
  }
}
