import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `YulSwitchCase`.
export function checkYulSwitchCaseVariant(
  variant: ast.YulSwitchCase['variant']
): void {
  if (variant instanceof ast.YulDefaultCase) return;
  if (variant instanceof ast.YulValueCase) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  return _exhaustiveCheck;
}
