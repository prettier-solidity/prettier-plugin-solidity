import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `StringExpression`.
export function checkStringExpressionVariant(
  variant: ast.StringExpression['variant']
): void {
  if (variant instanceof ast.StringLiteral) return;
  if (variant instanceof ast.StringLiterals) return;
  if (variant instanceof ast.HexStringLiteral) return;
  if (variant instanceof ast.HexStringLiterals) return;
  if (variant instanceof ast.UnicodeStringLiterals) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  _exhaustiveCheck;
}
