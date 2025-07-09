import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import { locEnd } from '../../slang-utils/loc.js';
import addCollectionFirstComment from './add-collection-first-comment.js';
import addCollectionLastComment from './add-collection-last-comment.js';

import type { HandlerParams } from './types.d.ts';

export default function handleStructComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.StructDefinition) {
    return false;
  }

  const nextCharacter = util.getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );

  if (
    precedingNode?.kind === NonterminalKind.StructMembers &&
    nextCharacter === '}'
  ) {
    addCollectionLastComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === NonterminalKind.StructMembers) {
    addCollectionFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
