import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionAdjacentComment from './add-collection-adjacent-comment.ts';

import type { HandlerParams } from './types.d.ts';

export default function handleParametersDeclarationComments(
  params: HandlerParams
): boolean {
  if (params.enclosingNode?.kind !== NonterminalKind.ParametersDeclaration) {
    return false;
  }

  return addCollectionAdjacentComment(NonterminalKind.Parameters, params);
}
