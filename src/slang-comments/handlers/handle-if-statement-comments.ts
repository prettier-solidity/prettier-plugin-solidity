import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import { locEnd } from '../../slang-utils/loc.js';
import addCollectionFirstComment from './add-collection-first-comment.js';

import type { HandlerParams } from './types.d.ts';

const { addLeadingComment, addTrailingComment } = util;

export default function handleIfStatementComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.IfStatement || !followingNode) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   if (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = util.getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );
  if (nextCharacter === ')') {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Comments before `else`:
  // - treat as leading comments of the elseBranch, if it's a BlockStatement
  // - treat as a dangling comment otherwise
  if (
    precedingNode === enclosingNode.body &&
    followingNode === enclosingNode.elseBranch
  ) {
    addTrailingComment(precedingNode.variant, comment);
    return true;
  }

  if (followingNode.kind === NonterminalKind.IfStatement) {
    if (followingNode.body.variant.kind === NonterminalKind.Block) {
      addCollectionFirstComment(followingNode.body.variant.statements, comment);
    } else {
      addLeadingComment(followingNode.body.variant, comment);
    }
    return true;
  }

  // For comments positioned after the condition parenthesis in an if statement
  // before the consequent without brackets on, such as
  // if (a) /* comment */ true
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
