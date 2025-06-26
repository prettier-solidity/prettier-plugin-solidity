import { NonterminalKind } from '@nomicfoundation/slang/cst';

import type { ContractSpecifier } from '../slang-nodes/ContractSpecifier.js';

export function sortContractSpecifiers(
  { variant: { kind: aKind } }: ContractSpecifier,
  { variant: { kind: bKind } }: ContractSpecifier
): number {
  // OverrideSpecifiers before ModifierInvocation
  if (
    aKind === NonterminalKind.InheritanceSpecifier &&
    bKind === NonterminalKind.StorageLayoutSpecifier
  )
    return -1;
  if (
    bKind === NonterminalKind.InheritanceSpecifier &&
    aKind === NonterminalKind.StorageLayoutSpecifier
  )
    return 1;

  return 0;
}
