import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import {
  isLast,
  isNextLineEmpty
} from '../slang-utils/backward-compatibility.js';
import { locEnd } from '../slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, CollectionNode, StrictAstNode } from '../slang-nodes';
import type { PrintFunction } from '../types';

const { hardline } = doc.builders;

export function printPreservingEmptyLines(
  path: AstPath<CollectionNode>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
): Doc {
  return path.map((childPath, index) => {
    const node = childPath.getNode() as StrictAstNode;

    return [
      // Only attempt to prepend an empty line if `node` is not the first item
      index > 0 &&
      // YulLabel adds a dedented line so we don't have to prepend a hardline.
      (node.kind !== NonterminalKind.YulStatement ||
        node.variant.kind !== NonterminalKind.YulLabel)
        ? hardline
        : '',
      print(childPath),
      // Only attempt to append an empty line if `node` is not the last item
      !isLast(childPath, index) &&
      // Append an empty line if the original text already had an one after the
      // current `node`
      isNextLineEmpty(options.originalText, locEnd(node))
        ? hardline
        : ''
    ];
  }, 'items');
}
