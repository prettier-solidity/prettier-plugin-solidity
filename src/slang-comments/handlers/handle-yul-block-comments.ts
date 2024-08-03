import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { util } from 'prettier';

import type { HandlerParams } from './types';

const { addLeadingComment, addDanglingComment } = util;

export default function handleYulBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.YulBlock) {
    return false;
  }

  if (
    precedingNode?.kind === NonterminalKind.YulStatements &&
    precedingNode.items.length === 0
  ) {
    addDanglingComment(precedingNode, comment, false);
    return true;
  }

  if (
    followingNode?.kind === NonterminalKind.YulStatements &&
    followingNode.items.length > 0
  ) {
    addLeadingComment(followingNode.items[0], comment);
    return true;
  }

  return false;
}
