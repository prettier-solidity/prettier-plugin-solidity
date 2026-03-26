import type { BlockComment } from '../slang-nodes/types.d.ts';

export function isIndentableBlockComment({ lines }: BlockComment): boolean {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line. The stars in the `/*` and
  // `*/` delimiters are not included in the comment value, so add them
  // back first.
  return lines.length > 1 && lines.every((line) => line.trimStart()[0] === '*');
}
