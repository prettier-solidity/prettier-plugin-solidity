import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';
import addHubNodeFirstComment from './add-hub-node-first-comment.js';
import addHubNodeLastComment from './add-hub-node-last-comment.js';

import type { HandlerParams } from './types';

const { addLeadingComment, addTrailingComment } = util;

export default function handleIfStatementComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  // console.log(comment);
  if (enclosingNode?.kind !== NonterminalKind.IfStatement || !followingNode) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   if (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment);
  if (nextCharacter === ')') {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Comments before `else`:
  // - treat as trailing comments of the consequent, if it's a BlockStatement
  // - treat as a dangling comment otherwise
  if (
    precedingNode === enclosingNode.body &&
    followingNode === enclosingNode.elseBranch
  ) {
    if (precedingNode.variant.kind === NonterminalKind.Block) {
      addHubNodeLastComment(precedingNode.variant.statements, comment);
    } else {
      addTrailingComment(precedingNode, comment);
    }
    return true;
  }

  if (followingNode.kind === NonterminalKind.IfStatement) {
    if (followingNode.body.variant.kind === NonterminalKind.Block) {
      addHubNodeFirstComment(followingNode.body.variant.statements, comment);
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
      addHubNodeFirstComment(followingNode.variant.statements, comment);
    } else {
      addLeadingComment(followingNode, comment);
    }
    return true;
  }
  return false;
}
