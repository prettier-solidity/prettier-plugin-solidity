import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';
import addCollectionNodeFirstComment from './add-collection-node-first-comment.js';
import addCollectionNodeLastComment from './add-collection-node-last-comment.js';

import type { HandlerParams } from './types.d.ts';

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
    addCollectionNodeLastComment(precedingNode, comment);
    return true;
  }

  // The last comments before the body.
  if (
    nextCharacter === '{' &&
    followingNode?.kind === NonterminalKind.InterfaceMembers
  ) {
    addCollectionNodeFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
