import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNode } from './PolymorphicNode.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.TupleMember,
  TupleMember
>([
  [ast.TypedTupleMember, TypedTupleMember],
  [ast.UntypedTupleMember, UntypedTupleMember]
]);

export class TupleMember extends PolymorphicNode<
  ast.TupleMember,
  TypedTupleMember | UntypedTupleMember
> {
  readonly kind = NonterminalKind.TupleMember;

  constructor(ast: ast.TupleMember, collected: CollectedMetadata) {
    super(ast, collected, (variant) =>
      createNonterminalVariant(variant, collected)
    );
  }
}
