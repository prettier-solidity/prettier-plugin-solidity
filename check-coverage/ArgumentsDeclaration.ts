import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of
// `ArgumentsDeclaration`.
export function checkArgumentsDeclarationVariant(
  variant: ast.ArgumentsDeclaration['variant']
): void {
  if (variant instanceof ast.PositionalArgumentsDeclaration) return;
  if (variant instanceof ast.NamedArgumentsDeclaration) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
