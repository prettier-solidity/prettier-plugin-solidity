import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionAdjacentComment from './add-collection-adjacent-comment.ts';

import type { HandlerParams } from './types.d.ts';

export default function handlePositionalArgumentsDeclarationComments(
  params: HandlerParams
): boolean {
  if (
    params.enclosingNode?.kind !==
    NonterminalKind.PositionalArgumentsDeclaration
  ) {
    return false;
  }

  return addCollectionAdjacentComment(
    NonterminalKind.PositionalArguments,
    params
  );
}
