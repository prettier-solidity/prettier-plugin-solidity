import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../common/backward-compatibility.js';
import { locEnd } from '../../common/slang-helpers.js';

const { addLeadingComment, addDanglingComment, addTrailingComment } = util;

export default function handleContractDefinitionComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}) {
  if (enclosingNode?.kind !== 'ContractDefinition') {
    return false;
  }

  if (
    precedingNode?.kind === 'ContractMembers' &&
    precedingNode.items.length === 0
  ) {
    addDanglingComment(precedingNode, comment);
    return true;
  }

  const nextCharacter = getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    locEnd
  );
  if (nextCharacter === '{') {
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

    if (followingNode?.kind === 'ContractMembers') {
      if (followingNode.items.length > 0) {
        addLeadingComment(followingNode.items[0], comment);
      } else {
        addDanglingComment(followingNode, comment);
      }
      return true;
    }
  }

  return false;
}
