import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `ContractSpecifier`.
export function checkContractSpecifierVariant(
  variant: ast.ContractSpecifier['variant']
): void {
  if (variant instanceof ast.InheritanceSpecifier) return;
  if (variant instanceof ast.StorageLayoutSpecifier) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
