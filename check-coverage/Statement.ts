import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `Statement`.
export function checkStatementVariant(variant: ast.Statement['variant']): void {
  if (variant instanceof ast.ExpressionStatement) return;
  if (variant instanceof ast.VariableDeclarationStatement) return;
  if (variant instanceof ast.TupleDeconstructionStatement) return;
  if (variant instanceof ast.IfStatement) return;
  if (variant instanceof ast.ForStatement) return;
  if (variant instanceof ast.WhileStatement) return;
  if (variant instanceof ast.DoWhileStatement) return;
  if (variant instanceof ast.ContinueStatement) return;
  if (variant instanceof ast.BreakStatement) return;
  if (variant instanceof ast.ReturnStatement) return;
  if (variant instanceof ast.ThrowStatement) return;
  if (variant instanceof ast.EmitStatement) return;
  if (variant instanceof ast.TryStatement) return;
  if (variant instanceof ast.RevertStatement) return;
  if (variant instanceof ast.AssemblyStatement) return;
  if (variant instanceof ast.Block) return;
  if (variant instanceof ast.UncheckedBlock) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
