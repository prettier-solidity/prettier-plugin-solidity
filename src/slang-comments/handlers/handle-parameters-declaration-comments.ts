import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionFirstComment from './add-collection-first-comment.js';
import addCollectionLastComment from './add-collection-last-comment.js';

import type { HandlerParams } from './types.d.ts';

export default function handleBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.ParametersDeclaration) {
    return false;
  }

  if (precedingNode?.kind === NonterminalKind.Parameters) {
    addCollectionLastComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === NonterminalKind.Parameters) {
    addCollectionFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
