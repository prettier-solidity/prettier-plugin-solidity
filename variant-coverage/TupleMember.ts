import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `TupleMember`.
export function checkTupleMemberVariant(
  variant: ast.TupleMember['variant']
): void {
  if (variant instanceof ast.TypedTupleMember) return;
  if (variant instanceof ast.UntypedTupleMember) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
