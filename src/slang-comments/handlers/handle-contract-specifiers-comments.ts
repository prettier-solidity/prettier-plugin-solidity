import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import addCollectionNodeLastComment from './add-collection-node-last-comment.js';

import type { HandlerParams } from './types.d.ts';

const { addTrailingComment } = util;

export default function handleContractSpecifiersComments({
  precedingNode,
  enclosingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.ContractSpecifiers) {
    return false;
  }

  if (
    precedingNode &&
    precedingNode.kind === NonterminalKind.ContractSpecifier
  ) {
    if (precedingNode.variant.kind === NonterminalKind.InheritanceSpecifier) {
      addCollectionNodeLastComment(precedingNode.variant.types, comment);
      return true;
    }
    if (precedingNode.variant.kind === NonterminalKind.StorageLayoutSpecifier) {
      addTrailingComment(precedingNode.variant.expression, comment);
      return true;
    }
  }

  return false;
}
