import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';

import type { HandlerParams } from './types.d.ts';

const { addLeadingComment } = util;

export default function handleStorageLayoutSpecifierComments({
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.StorageLayoutSpecifier) {
    return false;
  }

  if (followingNode?.kind === NonterminalKind.Expression) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}
