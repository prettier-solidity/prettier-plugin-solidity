import * as ast from '@nomicfoundation/slang/ast';

// This is to ensure that we have handled all variants of `Pragma`.
export function checkPragmaVariant(variant: ast.Pragma['variant']): void {
  if (variant instanceof ast.AbicoderPragma) return;
  if (variant instanceof ast.ExperimentalPragma) return;
  if (variant instanceof ast.VersionPragma) return;
  /* c8 ignore next 2 */
  const _exhaustiveCheck: never = variant;
}
