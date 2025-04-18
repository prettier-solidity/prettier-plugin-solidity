import { NonterminalKind } from '@nomicfoundation/slang/cst';

import type { ContractSpecifier } from '../slang-nodes/ContractSpecifier.js';

export function sortContractSpecifiers(
  a: ContractSpecifier,
  b: ContractSpecifier
): number {
  const aVariant = a.variant;
  const bVariant = b.variant;

  // OverrideSpecifiers before ModifierInvocation
  if (
    aVariant.kind === NonterminalKind.InheritanceSpecifier &&
    bVariant.kind === NonterminalKind.StorageLayoutSpecifier
  )
    return -1;
  if (
    bVariant.kind === NonterminalKind.InheritanceSpecifier &&
    aVariant.kind === NonterminalKind.StorageLayoutSpecifier
  )
    return 1;

  return 0;
}
