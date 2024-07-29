import type { SortableAttribute, SortableVariant } from './types';

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
  const aIsString = typeof a.variant === 'string';
  const bIsString = typeof b.variant === 'string';

  if (aIsString && !bIsString) return -1;
  if (bIsString && !aIsString) return 1;

  // Both are strings
  if (aIsString) {
    // Visibility First
    if (visibilityKeyWords.has(a.variant as string)) return -1;
    if (visibilityKeyWords.has(b.variant as string)) return 1;
    // State Mutability Second
    if (mutabilityKeyWords.has(a.variant as string)) return -1;
    if (mutabilityKeyWords.has(b.variant as string)) return 1;
    // Virtual keyword last
  }
  // Both are nodes
  // OverrideSpecifiers before ModifierInvocation
  if (
    (a.variant as SortableVariant).kind === 'OverrideSpecifier' &&
    (b.variant as SortableVariant).kind === 'ModifierInvocation'
  )
    return -1;
  if (
    (b.variant as SortableVariant).kind === 'OverrideSpecifier' &&
    (a.variant as SortableVariant).kind === 'ModifierInvocation'
  )
    return 1;

  return 0;
}
