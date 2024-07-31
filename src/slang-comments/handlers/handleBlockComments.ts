import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { util } from 'prettier';

import type { HandlerParams } from './types';

const { addDanglingComment, addLeadingComment, addTrailingComment } = util;

export default function handleBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.Block) {
    return false;
  }

  if (precedingNode?.kind === NonterminalKind.Statements) {
    if (precedingNode.items.length === 0) {
      addDanglingComment(precedingNode, comment, false);
    } else {
      addTrailingComment(
        precedingNode.items[precedingNode.items.length - 1],
        comment
      );
    }
    return true;
  }

  if (followingNode?.kind === NonterminalKind.Statements) {
    if (followingNode.items.length === 0) {
      addDanglingComment(followingNode, comment, false);
    } else {
      addLeadingComment(followingNode.items[0], comment);
    }
    return true;
  }

  return false;
}
