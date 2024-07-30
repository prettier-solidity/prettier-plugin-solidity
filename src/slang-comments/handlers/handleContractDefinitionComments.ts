import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';

import type { HandlerParams } from './types.js';

const { addLeadingComment, addDanglingComment, addTrailingComment } = util;

export default function handleContractDefinitionComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== 'ContractDefinition') {
    return false;
  }

  const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment);

  // Everything before the InheritanceSpecifier is pushed onto the beginning of
  // the ContractDefinition.
  if (
    followingNode?.kind === 'InheritanceSpecifier' ||
    (followingNode?.kind === 'ContractMembers' && nextCharacter !== '{')
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  // The comment is at the end of the body of the ContractDefinition.
  if (precedingNode?.kind === 'ContractMembers') {
    if (precedingNode.items.length === 0) {
      addDanglingComment(precedingNode, comment, false);
    } else {
      addTrailingComment(
        precedingNode.items[precedingNode.items.length - 1],
        comment
      );
    }
    return true;
  }

  // The last comments before the body.
  if (nextCharacter === '{') {
    // If there's an InheritanceSpecifier, the comment is appended to the last
    // InheritanceType.
    if (
      precedingNode?.kind === 'InheritanceSpecifier' &&
      precedingNode.types.items.length > 0
    ) {
      addTrailingComment(
        precedingNode.types.items[precedingNode.types.items.length - 1],
        comment
      );
      return true;
    }

    // If there's no InheritanceSpecifier, the comment before the body is
    // assumed to be intended at the beginning of the body.
    if (followingNode?.kind === 'ContractMembers') {
      if (followingNode.items.length > 0) {
        addLeadingComment(followingNode.items[0], comment);
      } else {
        addDanglingComment(followingNode, comment, false);
      }
      return true;
    }
  }

  return false;
}
