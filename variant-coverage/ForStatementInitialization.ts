import * as ast from '@nomicfoundation/slang/ast';
import { TerminalNode } from '@nomicfoundation/slang/cst';

// This is to ensure that we have handled all variants of
// `ForStatementInitialization`.
export function checkForStatementInitializationVariant(
  variant: ast.ForStatementInitialization['variant']
): void {
  if (variant instanceof TerminalNode) return;
  if (variant instanceof ast.ExpressionStatement) return;
  if (variant instanceof ast.VariableDeclarationStatement) return;
  if (variant instanceof ast.TupleDeconstructionStatement) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  _exhaustiveCheck;
}
