import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { TerminalNode } from '../slang-nodes/TerminalNode.js';

import type { SortableAttribute } from './types.d.ts';

const visibilityKeyWords = new Set([
  'external',
  'internal',
  'public',
  'private'
]);

const mutabilityKeyWords = new Set(['pure', 'constant', 'payable', 'view']);

export function sortFunctionAttributes(
  aVariant: SortableAttribute,
  bVariant: SortableAttribute
): number {
  const aIsString = aVariant instanceof TerminalNode;
  const bIsString = bVariant instanceof TerminalNode;

  if (aIsString && !bIsString) return -1;
  if (bIsString && !aIsString) return 1;

  // Both are strings
  if (aIsString && bIsString) {
    // Visibility First
    if (visibilityKeyWords.has(aVariant.value)) return -1;
    if (visibilityKeyWords.has(bVariant.value)) return 1;
    // State Mutability Second
    if (mutabilityKeyWords.has(aVariant.value)) return -1;
    if (mutabilityKeyWords.has(bVariant.value)) return 1;
    // Virtual keyword last
  }
  // Both are nodes
  if (!aIsString && !bIsString) {
    // OverrideSpecifiers before ModifierInvocation
    if (
      aVariant.kind === NonterminalKind.OverrideSpecifier &&
      bVariant.kind === NonterminalKind.ModifierInvocation
    )
      return -1;
    if (
      bVariant.kind === NonterminalKind.OverrideSpecifier &&
      aVariant.kind === NonterminalKind.ModifierInvocation
    )
      return 1;
  }

  return 0;
}
