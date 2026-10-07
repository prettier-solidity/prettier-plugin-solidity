import { printComment } from '../slang-comments/printer.ts';
import { isBlockComment } from '../slang-utils/is-comment.ts';
import { isNextLineEmpty } from '../slang-utils/prettier-utils.ts';
import { locEnd } from '../slang-utils/loc.ts';
import { breakParent, hardline } from './prettier-builders.ts';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from '../slang-nodes/types.d.ts';

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
    if (index === lastPrintableIndex) {
      // A line comment runs until the end of the line, so whatever comes after
      // it must start on a new line.
      return [printComment(path), isBlockComment(comment) ? '' : breakParent];
    }
    return [
      printComment(path),
      hardline,
      isNextLineEmpty(options.originalText, locEnd(comment)) ? hardline : ''
    ];
  }, 'comments');
}
