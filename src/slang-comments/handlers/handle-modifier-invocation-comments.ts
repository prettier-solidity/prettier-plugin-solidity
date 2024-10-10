import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';
import addCollectionNodeFirstComment from './add-collection-node-first-comment.js';

import type { HandlerParams } from './types.d.ts';

const { addTrailingComment } = util;

export default function handleModifierInvocationComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.ModifierInvocation) {
    return false;
  }

  const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment);

  // The last comments before the body.
  if (
    precedingNode?.kind === NonterminalKind.IdentifierPath &&
    nextCharacter === '(' &&
    followingNode?.kind === NonterminalKind.ArgumentsDeclaration &&
    followingNode.variant.kind ===
      NonterminalKind.PositionalArgumentsDeclaration
  ) {
    if (followingNode.variant.arguments.items.length === 0) {
      addTrailingComment(enclosingNode, comment);
    } else {
      addCollectionNodeFirstComment(followingNode.variant.arguments, comment);
    }
    return true;
  }

  return false;
}
