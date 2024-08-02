import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../slang-utils/backward-compatibility.js';
import addHubNodeFirstComment from './add-hub-node-first-comment.js';
import addHubNodeLastComment from './add-hub-node-last-comment.js';

import type { HandlerParams } from './types.js';

const { addLeadingComment, addTrailingComment } = util;

export default function handleContractDefinitionComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.ContractDefinition) {
    return false;
  }

  const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment);

  // Everything before the InheritanceSpecifier is pushed onto the beginning of
  // the ContractDefinition.
  if (
    followingNode?.kind === NonterminalKind.InheritanceSpecifier ||
    (followingNode?.kind === NonterminalKind.ContractMembers &&
      nextCharacter !== '{')
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  // The comment is at the end of the body of the ContractDefinition.
  if (precedingNode?.kind === NonterminalKind.ContractMembers) {
    addHubNodeLastComment(precedingNode, comment);
    return true;
  }

  // The last comments before the body.
  if (nextCharacter === '{') {
    // If there's an InheritanceSpecifier, the comment is appended to the last
    // InheritanceType.
    if (
      precedingNode?.kind === NonterminalKind.InheritanceSpecifier &&
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
    if (followingNode?.kind === NonterminalKind.ContractMembers) {
      addHubNodeFirstComment(followingNode, comment);
      return true;
    }
  }

  return false;
}
