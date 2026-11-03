import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionFirstComment from './add-collection-first-comment.ts';
import addCollectionLastComment from './add-collection-last-comment.ts';

import type { HandlerParams } from './types.d.ts';

export default function handleYulBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.YulBlock) {
    return false;
  }

  if (precedingNode?.kind === NonterminalKind.YulStatements) {
    addCollectionLastComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === NonterminalKind.YulStatements) {
    addCollectionFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
