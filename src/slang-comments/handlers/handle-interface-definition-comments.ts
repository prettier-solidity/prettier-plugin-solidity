import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import { locEnd } from '../../slang-utils/loc.js';
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

  const nextCharacter = util.getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );

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
