import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import addCollectionNodeFirstComment from './add-collection-node-first-comment.js';

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
    followingNode.variant.kind === NonterminalKind.IfStatement
  ) {
    if (followingNode.variant.body.variant.kind === NonterminalKind.Block) {
      addCollectionNodeFirstComment(
        followingNode.variant.body.variant.statements,
        comment
      );
    } else {
      addLeadingComment(followingNode.variant.body.variant, comment);
    }
    return true;
  }

  return false;
}
