import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc, util } from 'prettier';
import { locEnd } from '../slang-utils/loc.js';
import { printComments } from './print-comments.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, LineCollection } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export function printPreservingEmptyLines(
  node: LineCollection,
  path: AstPath<LineCollection>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
): Doc {
  return node.items.length > 0
    ? path.map(({ node, isFirst, isLast }) => {
        return [
          // Only attempt to prepend an empty line if `node` is not the first item
          !isFirst &&
          // YulLabel adds a dedented line so we don't have to prepend a hardline.
          node.kind !== NonterminalKind.YulLabel
            ? hardline
            : '',
          print(path),
          // Only attempt to append an empty line if `node` is not the last item
          !isLast &&
          // Append an empty line if the original text already had an one after the
          // current `node`
          util.isNextLineEmpty(options.originalText, locEnd(node))
            ? hardline
            : ''
        ];
      }, 'items')
    : printComments(node, path, options);
}
