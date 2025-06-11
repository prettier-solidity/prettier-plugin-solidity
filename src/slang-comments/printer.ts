import { isComment } from '../slang-utils/is-comment.js';

import type { AstPath, Doc } from 'prettier';
import type { AstNode } from '../slang-nodes/types.d.ts';

export function printComment(commentPath: AstPath<AstNode>): Doc {
  const { node: comment } = commentPath;

  if (isComment(comment)) {
    return comment.print();
  }

  throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
}
