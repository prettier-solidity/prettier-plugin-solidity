import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `UsingClause`.
export function checkUsingClauseVariant(
  variant: ast.UsingClause['variant']
): void {
  if (variant instanceof ast.IdentifierPath) return;
  if (variant instanceof ast.UsingDeconstruction) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
