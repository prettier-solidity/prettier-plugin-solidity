import * as ast from '@nomicfoundation/slang/ast';
import { TerminalNode } from '@nomicfoundation/slang/cst';

// This is to ensure that we have handled all variants of `YulLiteral`.
export function checkYulLiteralVariant(
  variant: ast.YulLiteral['variant']
): void {
  if (variant instanceof TerminalNode) return;
  if (variant instanceof ast.HexStringLiteral) return;
  if (variant instanceof ast.StringLiteral) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  _exhaustiveCheck;
}
