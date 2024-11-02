import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import { locEnd } from '../../slang-utils/loc.js';
import addCollectionNodeLastComment from './add-collection-node-last-comment.js';

import type { HandlerParams } from './types.d.ts';

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

  const nextCharacter = util.getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );

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
    addCollectionNodeLastComment(precedingNode, comment);
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
  }

  return false;
}
