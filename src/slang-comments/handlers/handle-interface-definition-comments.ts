import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/prettier-utils.js';
import { locEnd } from '../../slang-utils/loc.js';
import addCollectionFirstComment from './add-collection-first-comment.js';
import addCollectionLastComment from './add-collection-last-comment.js';

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

  const nextCharacter = getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );

  // The comment is at the end of the body of the InterfaceDefinition.
  if (precedingNode?.kind === NonterminalKind.InterfaceMembers) {
    addCollectionLastComment(precedingNode, comment);
    return true;
  }

  // The last comments before the body.
  if (
    nextCharacter === '{' &&
    followingNode?.kind === NonterminalKind.InterfaceMembers
  ) {
    addCollectionFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
