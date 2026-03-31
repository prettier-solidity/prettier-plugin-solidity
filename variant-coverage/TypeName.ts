import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `TypeName`.
export function checkTypeNameVariant(variant: ast.TypeName['variant']): void {
  if (variant instanceof ast.ArrayTypeName) return;
  if (variant instanceof ast.FunctionType) return;
  if (variant instanceof ast.MappingType) return;
  if (variant instanceof ast.IdentifierPath) return;
  if (variant instanceof ast.ElementaryType) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  return _exhaustiveCheck;
}
