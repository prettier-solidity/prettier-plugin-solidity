import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';

import type { HandlerParams } from './types.d.ts';

const { addLeadingComment, addTrailingComment } = util;

export default function handleMemberAccessExpressionComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.MemberAccessExpression) {
    return false;
  }

  if (followingNode === enclosingNode.operand) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  if (
    precedingNode === enclosingNode.operand &&
    followingNode === enclosingNode.member
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (precedingNode === enclosingNode.member) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}
