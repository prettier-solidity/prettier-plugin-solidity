import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';
import addHubNodeFirstComment from './add-hub-node-first-comment.js';

import type { HandlerParams } from './types.js';

const { addLeadingComment, addTrailingComment } = util;

export default function handleWhileStatementComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (
    enclosingNode?.kind !== NonterminalKind.WhileStatement ||
    !followingNode
  ) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   while (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment);
  if (nextCharacter === ')' || enclosingNode.condition === precedingNode) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (enclosingNode.body === followingNode) {
    if (followingNode.variant.kind === NonterminalKind.Block) {
      addHubNodeFirstComment(followingNode.variant.statements, comment);
    } else {
      addLeadingComment(followingNode, comment);
    }
    return true;
  }

  return false;
}
