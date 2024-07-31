import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import {
  isLast,
  isNextLineEmpty
} from '../slang-utils/backward-compatibility.js';
import { locEnd } from '../slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../types.js';

const { hardline } = doc.builders;

export function printPreservingEmptyLines(
  path: AstPath,
  key: string,
  print: (path: AstPath) => Doc,
  options: ParserOptions<AstNode>
): Doc {
  return path.map((childPath, index) => {
    const node = childPath.getNode() as AstNode;

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
      !isLast(childPath, key, index) &&
      // Append an empty line if the original text already had an one after the
      // current `node`
      isNextLineEmpty(options.originalText, locEnd(node))
        ? hardline
        : ''
    ];
  }, key);
}
