import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc, util } from 'prettier';
import { locEnd } from '../slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, NodeCollection } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export function printPreservingEmptyLines(
  path: AstPath<NodeCollection>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
): Doc {
  return path.map((childPath) => {
    const node = childPath.node;

    return [
      // Only attempt to prepend an empty line if `node` is not the first item
      !childPath.isFirst &&
      // YulLabel adds a dedented line so we don't have to prepend a hardline.
      (node.kind !== NonterminalKind.YulStatement ||
        node.variant.kind !== NonterminalKind.YulLabel)
        ? hardline
        : '',
      print(childPath),
      // Only attempt to append an empty line if `node` is not the last item
      !childPath.isLast &&
      // Append an empty line if the original text already had an one after the
      // current `node`
      util.isNextLineEmpty(options.originalText, locEnd(node))
        ? hardline
        : ''
    ];
  }, 'items');
}
