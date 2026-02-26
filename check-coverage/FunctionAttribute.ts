import * as ast from '@nomicfoundation/slang/ast';
import { TerminalNode } from '@nomicfoundation/slang/cst';

// This is to ensure that we have handled all variants of `FunctionAttribute`.
export function checkFunctionAttributeVariant(
  variant: ast.FunctionAttribute['variant']
): void {
  if (variant instanceof TerminalNode) return;
  if (variant instanceof ast.ModifierInvocation) return;
  if (variant instanceof ast.OverrideSpecifier) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
