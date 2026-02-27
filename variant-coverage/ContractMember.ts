import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `ContractMember`.
export function checkContractMemberVariant(
  variant: ast.ContractMember['variant']
): void {
  if (variant instanceof ast.UsingDirective) return;
  if (variant instanceof ast.FunctionDefinition) return;
  if (variant instanceof ast.ConstructorDefinition) return;
  if (variant instanceof ast.ReceiveFunctionDefinition) return;
  if (variant instanceof ast.FallbackFunctionDefinition) return;
  if (variant instanceof ast.UnnamedFunctionDefinition) return;
  if (variant instanceof ast.ModifierDefinition) return;
  if (variant instanceof ast.StructDefinition) return;
  if (variant instanceof ast.EnumDefinition) return;
  if (variant instanceof ast.EventDefinition) return;
  if (variant instanceof ast.StateVariableDefinition) return;
  if (variant instanceof ast.ErrorDefinition) return;
  if (variant instanceof ast.UserDefinedValueTypeDefinition) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
