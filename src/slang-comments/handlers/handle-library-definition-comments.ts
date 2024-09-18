import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';
import addCollectionNodeFirstComment from './add-collection-node-first-comment.js';
import addCollectionNodeLastComment from './add-collection-node-last-comment.js';

import type { HandlerParams } from './types';

export default function handleLibraryDefinitionComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.LibraryDefinition) {
    return false;
  }

  const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment);

  // The comment is at the end of the body of the ContractDefinition.
  if (precedingNode?.kind === NonterminalKind.LibraryMembers) {
    addCollectionNodeLastComment(precedingNode, comment);
    return true;
  }

  // The last comments before the body.
  if (
    nextCharacter === '{' &&
    followingNode?.kind === NonterminalKind.LibraryMembers
  ) {
    addCollectionNodeFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
