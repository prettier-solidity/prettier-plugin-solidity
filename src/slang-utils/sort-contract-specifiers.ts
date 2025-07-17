import { NonterminalKind } from '@nomicfoundation/slang/cst';

import type { ContractSpecifier } from '../slang-nodes/ContractSpecifier.ts';

export function sortContractSpecifiers(
  { kind: aKind }: ContractSpecifier['variant'],
  { kind: bKind }: ContractSpecifier['variant']
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
