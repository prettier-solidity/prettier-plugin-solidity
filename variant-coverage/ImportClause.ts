import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `ImportClause`.
export function checkImportClauseVariant(
  variant: ast.ImportClause['variant']
): void {
  if (variant instanceof ast.PathImport) return;
  if (variant instanceof ast.NamedImport) return;
  if (variant instanceof ast.ImportDeconstruction) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  _exhaustiveCheck;
}
