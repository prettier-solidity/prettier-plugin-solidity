import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';

import type { SortableAttribute } from './types';

const visibilityKeyWords = new Set([
  'external',
  'internal',
  'public',
  'private'
]);

const mutabilityKeyWords = new Set(['pure', 'constant', 'payable', 'view']);

export function sortFunctionAttributes(
  a: SortableAttribute,
  b: SortableAttribute
): number {
  const aVariant = a.variant;
  const bVariant = b.variant;

  const aIsString = typeof aVariant === 'string';
  const bIsString = typeof bVariant === 'string';

  if (aIsString && !bIsString) return -1;
  if (bIsString && !aIsString) return 1;

  // Both are strings
  if (aIsString && bIsString) {
    // Visibility First
    if (visibilityKeyWords.has(aVariant)) return -1;
    if (visibilityKeyWords.has(bVariant)) return 1;
    // State Mutability Second
    if (mutabilityKeyWords.has(aVariant)) return -1;
    if (mutabilityKeyWords.has(bVariant)) return 1;
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