import * as ast from '@nomicfoundation/slang/ast';
import { TerminalNode } from '@nomicfoundation/slang/cst';

// This is to ensure that we have handled all variants of
// `FallbackFunctionAttribute`.
export function checkFallbackFunctionAttributeVariant(
  variant: ast.FallbackFunctionAttribute['variant']
): void {
  if (variant instanceof TerminalNode) return;
  if (variant instanceof ast.ModifierInvocation) return;
  if (variant instanceof ast.OverrideSpecifier) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  return _exhaustiveCheck;
}
