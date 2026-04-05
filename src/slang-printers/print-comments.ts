import { doc, util } from 'prettier';
import { printComment } from '../slang-comments/printer.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { locEnd } from '../slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  AstNode,
  Comment,
  StrictAstNode
} from '../slang-nodes/types.d.ts';

const { hardline, line } = doc.builders;

function isPrintable(comment: Comment): boolean {
  return !comment.trailing && !comment.leading && !comment.printed;
}

export function printComments(
  node: StrictAstNode,
  path: AstPath<StrictAstNode>,
  options: ParserOptions<AstNode>
): Doc[] {
  const lastPrintableIndex = (node.comments ?? []).findLastIndex(isPrintable);
  if (lastPrintableIndex === -1) {
    return [];
  }
  return joinExisting(
    line,
    path.map(({ node: comment }, index) => {
      if (!isPrintable(comment)) {
        return '';
      }
      comment.printed = true;
      return [
        printComment(path),
        index !== lastPrintableIndex &&
        util.isNextLineEmpty(options.originalText, locEnd(comment))
          ? hardline
          : ''
      ];
    }, 'comments')
  );
}
