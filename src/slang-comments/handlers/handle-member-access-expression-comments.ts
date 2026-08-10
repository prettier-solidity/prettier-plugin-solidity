import { NonterminalKind } from '@nomicfoundation/slang/cst';
import {
  addLeadingComment,
  addTrailingComment
} from '../../slang-utils/prettier-utils.js';

import type { HandlerParams } from './types.d.ts';

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
