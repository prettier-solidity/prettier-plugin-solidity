import { doc } from 'prettier';
import { printComment } from '../slang-comments/printer.js';
import { isBlockComment } from '../slang-utils/is-comment.js';
import { joinExisting } from '../slang-utils/join-existing.js';

import type { AstPath, Doc } from 'prettier';
import type { AstNode } from '../slang-nodes/types.d.ts';

const { breakParent, line } = doc.builders;

export function printComments(path: AstPath<AstNode>): Doc[] {
  const document = joinExisting(
    line,
    path.map((commentPath) => {
      const comment = commentPath.node;
      if (comment.trailing || comment.leading || comment.printed) {
        return '';
      }
      comment.printed = true;
      const printed = printComment(commentPath);
      return isBlockComment(comment) ? printed : [printed, breakParent];
    }, 'comments')
  );

  return document;
}
