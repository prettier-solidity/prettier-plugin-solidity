import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `YulStatement`.
export function checkYulStatementVariant(
  variant: ast.YulStatement['variant']
): void {
  if (variant instanceof ast.YulBlock) return;
  if (variant instanceof ast.YulFunctionDefinition) return;
  if (variant instanceof ast.YulVariableDeclarationStatement) return;
  if (variant instanceof ast.YulVariableAssignmentStatement) return;
  if (variant instanceof ast.YulStackAssignmentStatement) return;
  if (variant instanceof ast.YulIfStatement) return;
  if (variant instanceof ast.YulForStatement) return;
  if (variant instanceof ast.YulSwitchStatement) return;
  if (variant instanceof ast.YulLeaveStatement) return;
  if (variant instanceof ast.YulBreakStatement) return;
  if (variant instanceof ast.YulContinueStatement) return;
  if (variant instanceof ast.YulLabel) return;
  if (variant instanceof ast.YulExpression) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  return _exhaustiveCheck;
}
