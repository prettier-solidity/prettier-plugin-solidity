const visibilityKeyWords = new Set([
  'external',
  'internal',
  'public',
  'private'
]);

const mutabilityKeyWords = new Set(['pure', 'constant', 'payable', 'view']);

export function sortFunctionAttributes(a, b) {
  const aIsString = typeof a.variant === 'string';
  const bIsString = typeof b.variant === 'string';

  if (aIsString && !bIsString) return -1;
  if (bIsString && !aIsString) return 1;

  // Both are strings
  if (aIsString && bIsString) {
    // Visibility First
    if (visibilityKeyWords.has(a.variant)) return -1;
    if (visibilityKeyWords.has(b.variant)) return 1;
    // State Mutability Second
    if (mutabilityKeyWords.has(a.variant)) return -1;
    if (mutabilityKeyWords.has(b.variant)) return 1;
    // Virtual keyword last
  } else {
    // Both are nodes
    if (
      a.variant.kind === 'OverrideSpecifier' &&
      b.variant.kind === 'ModifierInvocation'
    )
      return -1;
    if (
      b.variant.kind === 'OverrideSpecifier' &&
      a.variant.kind === 'ModifierInvocation'
    )
      return 1;
  }
  return 0;
}
