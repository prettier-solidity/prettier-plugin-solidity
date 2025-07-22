import { doc } from 'prettier';
import { printComment } from '../slang-comments/printer.js';
import { joinExisting } from '../slang-utils/join-existing.js';

import type { AstPath, Doc } from 'prettier';
import type { AstNode } from '../slang-nodes/types.d.ts';

const { line } = doc.builders;

export function printComments(path: AstPath<AstNode>): Doc[] {
  return joinExisting(
    line,
    path.map((commentPath) => {
      const comment = commentPath.node;
      if (comment.trailing || comment.leading || comment.printed) {
        return '';
      }
      comment.printed = true;
      return printComment(commentPath);
    }, 'comments')
  );
}
