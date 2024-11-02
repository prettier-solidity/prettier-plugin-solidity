import { NonterminalKind } from '@nomicfoundation/slang/cst';
import addCollectionNodeFirstComment from './add-collection-node-first-comment.js';
import addCollectionNodeLastComment from './add-collection-node-last-comment.js';

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
    addCollectionNodeLastComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === NonterminalKind.Parameters) {
    addCollectionNodeFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
