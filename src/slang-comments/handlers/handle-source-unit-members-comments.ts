import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionFirstComment from './add-collection-first-comment.js';
import addCollectionLastComment from './add-collection-last-comment.js';

import type { HandlerParams } from './types.d.ts';

export default function handleSourceUnitMembersComments({
  precedingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (
    followingNode &&
    followingNode.kind === NonterminalKind.SourceUnitMembers
  ) {
    addCollectionFirstComment(followingNode, comment);
    return true;
  }
  if (
    precedingNode &&
    precedingNode.kind === NonterminalKind.SourceUnitMembers
  ) {
    addCollectionLastComment(precedingNode, comment);
    return true;
  }

  return false;
}
