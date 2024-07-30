import { doc } from 'prettier';
import { printComment } from '../slang-comments/printer.js';
import { getNode, isPrettier2 } from '../slang-utils/backward-compatibility.js';

import type { AstPath, Doc } from 'prettier';
import type { Comment, astNode } from '../types.js';
import type { DocV2 } from './types.js';

const { join, line } = doc.builders;

export function printComments(node: astNode, path: AstPath): Doc[] {
  if (!node.comments) return [];
  const document = join(
    line,
    path
      .map((commentPath) => {
        const comment = getNode(commentPath) as Comment;
        if (comment.trailing || comment.leading || comment.printed) {
          return '';
        }
        comment.printed = true;
        return printComment(commentPath);
      }, 'comments')
      .filter(Boolean)
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return isPrettier2
    ? (document as DocV2).parts // Prettier V2
    : document; // Prettier V3
  /* c8 ignore stop */
}
