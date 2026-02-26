import * as ast from '@nomicfoundation/slang/ast';
import { TerminalNode } from '@nomicfoundation/slang/cst';

// This is to ensure that we have handled all variants of `Expression`.
export function checkExpressionVariant(
  variant: ast.Expression['variant']
): void {
  if (variant instanceof TerminalNode) return;
  if (variant instanceof ast.AssignmentExpression) return;
  if (variant instanceof ast.ConditionalExpression) return;
  if (variant instanceof ast.OrExpression) return;
  if (variant instanceof ast.AndExpression) return;
  if (variant instanceof ast.EqualityExpression) return;
  if (variant instanceof ast.InequalityExpression) return;
  if (variant instanceof ast.BitwiseOrExpression) return;
  if (variant instanceof ast.BitwiseXorExpression) return;
  if (variant instanceof ast.BitwiseAndExpression) return;
  if (variant instanceof ast.ShiftExpression) return;
  if (variant instanceof ast.AdditiveExpression) return;
  if (variant instanceof ast.MultiplicativeExpression) return;
  if (variant instanceof ast.ExponentiationExpression) return;
  if (variant instanceof ast.PostfixExpression) return;
  if (variant instanceof ast.PrefixExpression) return;
  if (variant instanceof ast.FunctionCallExpression) return;
  if (variant instanceof ast.CallOptionsExpression) return;
  if (variant instanceof ast.MemberAccessExpression) return;
  if (variant instanceof ast.IndexAccessExpression) return;
  if (variant instanceof ast.NewExpression) return;
  if (variant instanceof ast.TupleExpression) return;
  if (variant instanceof ast.TypeExpression) return;
  if (variant instanceof ast.ArrayExpression) return;
  if (variant instanceof ast.HexNumberExpression) return;
  if (variant instanceof ast.DecimalNumberExpression) return;
  if (variant instanceof ast.StringExpression) return;
  if (variant instanceof ast.ElementaryType) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
