import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import addHubNodeFirstComment from './add-hub-node-first-comment.js';
import addHubNodeLastComment from './add-hub-node-last-comment.js';

import type { HandlerParams } from './types';

export default function handlePositionalArgumentsDeclarationComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (comment.value.startsWith('// test')) {
    console.log(comment);
  }
  if (enclosingNode?.kind !== NonterminalKind.PositionalArgumentsDeclaration) {
    return false;
  }

  if (precedingNode?.kind === NonterminalKind.PositionalArguments) {
    addHubNodeLastComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === NonterminalKind.PositionalArguments) {
    addHubNodeFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
