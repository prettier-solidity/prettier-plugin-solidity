import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { util } from 'prettier';
import addHubNodeFirstComment from './add-hub-node-first-comment.js';

import type { HandlerParams } from './types.js';

const { addDanglingComment, addTrailingComment } = util;

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
    addHubNodeFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
