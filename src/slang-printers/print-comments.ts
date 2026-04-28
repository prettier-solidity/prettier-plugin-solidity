import { doc, util } from 'prettier';
import { printComment } from '../slang-comments/printer.js';
import { locEnd } from '../slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from '../slang-nodes/types.d.ts';

const { hardline } = doc.builders;

function isPrintable(comment: Comment): boolean {
  return !comment.trailing && !comment.leading && !comment.printed;
}

export function printComments(
  node: PrintableNode,
  path: AstPath<PrintableNode>,
  options: ParserOptions<PrintableNode>
): Doc[] {
  const lastPrintableIndex = node.comments?.findLastIndex(isPrintable) ?? -1;
  if (lastPrintableIndex === -1) {
    return [];
  }
  return path.map(({ node: comment }, index) => {
    if (!isPrintable(comment)) {
      return '';
    }
    comment.printed = true;
    return [
      printComment(path),
      index !== lastPrintableIndex
        ? [
            hardline,
            util.isNextLineEmpty(options.originalText, locEnd(comment))
              ? hardline
              : ''
          ]
        : ''
    ];
  }, 'comments');
}
