import { isComment } from '../slang-utils/is-comment.js';

import type { AstPath, Doc } from 'prettier';
import type { PrintableNode } from '../slang-nodes/types.d.ts';

export function printComment({ node: comment }: AstPath<PrintableNode>): Doc {
  if (isComment(comment)) {
    return comment.print();
  }

  throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
}
