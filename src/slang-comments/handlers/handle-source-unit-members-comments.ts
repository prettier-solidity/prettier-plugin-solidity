import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionAdjacentComment from './add-collection-adjacent-comment.ts';

import type { HandlerParams } from './types.d.ts';

export default function handleSourceUnitMembersComments(
  params: HandlerParams
): boolean {
  return addCollectionAdjacentComment(
    NonterminalKind.SourceUnitMembers,
    params
  );
}
