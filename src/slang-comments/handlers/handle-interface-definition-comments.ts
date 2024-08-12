import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';
import addHubNodeFirstComment from './add-hub-node-first-comment.js';
import addHubNodeLastComment from './add-hub-node-last-comment.js';

import type { HandlerParams } from './types';

export default function handleInterfaceDefinitionComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.InterfaceDefinition) {
    return false;
  }

  const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment);

  // The comment is at the end of the body of the InterfaceDefinition.
  if (precedingNode?.kind === NonterminalKind.InterfaceMembers) {
    addHubNodeLastComment(precedingNode, comment);
    return true;
  }

  // The last comments before the body.
  if (
    nextCharacter === '{' &&
    followingNode?.kind === NonterminalKind.InterfaceMembers
  ) {
    addHubNodeFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
