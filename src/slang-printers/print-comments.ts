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
  path: AstPath<StrictAstNode>,
  options: ParserOptions<AstNode>
): Doc[] {
  if (path.node.comments === undefined) return [];
  return joinExisting(
    line,
    path.map((commentPath, index, comments: Comment[]) => {
      const comment = commentPath.node;
      if (!isPrintable(comment)) {
        return '';
      }
      comment.printed = true;
      const isLast =
        index === comments.length - 1 ||
        comments.slice(index + 1).findIndex(isPrintable) === -1;
      return [
        printComment(commentPath),
        !isLast && util.isNextLineEmpty(options.originalText, locEnd(comment))
          ? hardline
          : ''
      ];
    }, 'comments')
  );
}
