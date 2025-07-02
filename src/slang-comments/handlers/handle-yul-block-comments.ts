import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionLastComment from './add-collection-last-comment.js';
import addCollectionFirstComment from './add-collection-first-comment.js';

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
    addCollectionFirstComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === NonterminalKind.YulStatements) {
    addCollectionLastComment(followingNode, comment);
    return true;
  }

  return false;
}
