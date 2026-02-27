import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `YulExpression`.
export function checkYulExpressionVariant(
  variant: ast.YulExpression['variant']
): void {
  if (variant instanceof ast.YulFunctionCallExpression) return;
  if (variant instanceof ast.YulLiteral) return;
  if (variant instanceof ast.YulPath) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  _exhaustiveCheck;
}
