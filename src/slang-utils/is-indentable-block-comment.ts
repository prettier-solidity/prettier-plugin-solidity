import type { BlockComment } from '../slang-nodes/types.d.ts';

export function isIndentableBlockComment(comment: BlockComment): boolean {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line. The stars in the `/*` and
  // `*/` delimiters are not included in the comment value, so add them
  // back first.
  const lines = comment.value.slice(1, -1).split('\n');
  return lines.length > 1 && lines.every((line) => line.trimStart()[0] === '*');
}
