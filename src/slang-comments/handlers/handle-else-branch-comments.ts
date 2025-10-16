import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import addCollectionFirstComment from './add-collection-first-comment.js';

import type { HandlerParams } from './types.d.ts';

const { addLeadingComment } = util;

export default function handleElseBranchComments({
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.ElseBranch || !followingNode) {
    return false;
  }

  if (
    followingNode === enclosingNode.body &&
    followingNode.kind === NonterminalKind.IfStatement
  ) {
    if (followingNode.body.kind === NonterminalKind.Block) {
      addCollectionFirstComment(followingNode.body.statements, comment);
    } else {
      addLeadingComment(followingNode.body, comment);
    }
    return true;
  }

  return false;
}
