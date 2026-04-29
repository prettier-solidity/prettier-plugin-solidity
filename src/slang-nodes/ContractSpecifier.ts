import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.ContractSpecifier,
  ContractSpecifier
>([
  [ast.InheritanceSpecifier, InheritanceSpecifier],
  [ast.StorageLayoutSpecifier, StorageLayoutSpecifier]
]);

export class ContractSpecifier extends PolymorphicNonterminalNode<
  ast.ContractSpecifier,
  InheritanceSpecifier | StorageLayoutSpecifier
> {
  readonly kind = NonterminalKind.ContractSpecifier;

  constructor(ast: ast.ContractSpecifier, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
