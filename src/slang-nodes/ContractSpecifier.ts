import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { InheritanceSpecifier } from './InheritanceSpecifier.ts';
import { StorageLayoutSpecifier } from './StorageLayoutSpecifier.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ContractSpecifier,
  ContractSpecifier
>([
  [ast.InheritanceSpecifier, InheritanceSpecifier],
  [ast.StorageLayoutSpecifier, StorageLayoutSpecifier]
]);

export class ContractSpecifier extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifier;

  variant: InheritanceSpecifier | StorageLayoutSpecifier;

  constructor(ast: ast.ContractSpecifier, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
