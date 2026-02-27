import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `MappingKeyType`.
export function checkMappingKeyTypeVariant(
  variant: ast.MappingKeyType['variant']
): void {
  if (variant instanceof ast.IdentifierPath) return;
  if (variant instanceof ast.ElementaryType) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  _exhaustiveCheck;
}
