import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `VersionExpression`.
export function checkVersionExpressionVariant(
  variant: ast.VersionExpression['variant']
): void {
  if (variant instanceof ast.VersionRange) return;
  if (variant instanceof ast.VersionTerm) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  return _exhaustiveCheck;
}
