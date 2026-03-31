import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `SourceUnitMember`.
export function checkSourceUnitMemberVariant(
  variant: ast.SourceUnitMember['variant']
): void {
  if (variant instanceof ast.PragmaDirective) return;
  if (variant instanceof ast.ImportDirective) return;
  if (variant instanceof ast.ContractDefinition) return;
  if (variant instanceof ast.InterfaceDefinition) return;
  if (variant instanceof ast.LibraryDefinition) return;
  if (variant instanceof ast.StructDefinition) return;
  if (variant instanceof ast.EnumDefinition) return;
  if (variant instanceof ast.FunctionDefinition) return;
  if (variant instanceof ast.ConstantDefinition) return;
  if (variant instanceof ast.ErrorDefinition) return;
  if (variant instanceof ast.UserDefinedValueTypeDefinition) return;
  if (variant instanceof ast.UsingDirective) return;
  if (variant instanceof ast.EventDefinition) return;
  /* c8 ignore next 3 */
  const _exhaustiveCheck: never = variant;
  return _exhaustiveCheck;
}
