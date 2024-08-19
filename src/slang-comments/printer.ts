import { doc } from 'prettier';
import { isComment } from '../slang-utils/is-comment.js';

import type { AstPath, Doc } from 'prettier';
import type { AstNode, BlockComment } from '../slang-nodes';

const { hardline, join } = doc.builders;

export function isIndentableBlockComment(comment: BlockComment): boolean {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line. The stars in the `/*` and
  // `*/` delimiters are not included in the comment value, so add them
  // back first.
  const lines = comment.value.slice(1, -1).split('\n');
  return lines.length > 1 && lines.every((line) => line.trimStart()[0] === '*');
}

export function printIndentableBlockComment(comment: BlockComment): Doc {
  const lines = comment.value.split('\n');

  return join(
    hardline,
    lines.map((line, index) =>
      index === 0
        ? line.trimEnd()
        : ` ${index < lines.length - 1 ? line.trim() : line.trimStart()}`
    )
  );
}

export function printComment(commentPath: AstPath<AstNode>): Doc {
  const comment = commentPath.getNode()!;

  if (isComment(comment)) {
    return comment.print();
  }

  throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
}
