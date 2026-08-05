import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { addTrailingComment } from '../../slang-utils/prettier-utils.js';
import addCollectionLastComment from './add-collection-last-comment.js';

import type { HandlerParams } from './types.d.ts';

export default function handleContractSpecifiersComments({
  precedingNode,
  enclosingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.ContractSpecifiers) {
    return false;
  }

  if (precedingNode) {
    if (precedingNode.kind === NonterminalKind.InheritanceSpecifier) {
      addCollectionLastComment(precedingNode.types, comment);
      return true;
    }
    if (precedingNode.kind === NonterminalKind.StorageLayoutSpecifier) {
      addTrailingComment(precedingNode.expression, comment);
      return true;
    }
  }

  return false;
}
