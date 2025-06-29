import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import { locEnd } from '../../slang-utils/loc.js';
import addCollectionFirstComment from './add-collection-first-comment.js';

import type { HandlerParams } from './types.d.ts';

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
  const nextCharacter = util.getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );
  if (nextCharacter === ')' || enclosingNode.condition === precedingNode) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (enclosingNode.body === followingNode) {
    if (followingNode.variant.kind === NonterminalKind.Block) {
      addCollectionFirstComment(followingNode.variant.statements, comment);
    } else {
      addLeadingComment(followingNode, comment);
    }
    return true;
  }

  return false;
}
