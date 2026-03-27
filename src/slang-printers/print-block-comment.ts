import { doc } from 'prettier';

import type { Doc } from 'prettier';
import type { BlockComment } from '../slang-nodes/types.d.ts';

const { hardline, join, literalline } = doc.builders;

function isIndentableBlockComment(lines: string[]): boolean {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line.
  return lines.length > 1 && lines.every((line) => line.trimStart()[0] === '*');
}

function printIndentableBlockComment(lines: string[]): Doc {
  return join(
    hardline,
    lines.map((line, index) =>
      index === 0
        ? line.trimEnd()
        : ` ${index < lines.length - 1 ? line.trim() : line.trimStart()}`
    )
  );
}

export function printBlockComment(comment: BlockComment): Doc {
  // We remove the initial `/` to check if every line starts with `*`
  const lines = comment.value.slice(1).split('\n');

  return [
    '/',
    isIndentableBlockComment(lines)
      ? printIndentableBlockComment(lines)
      : join(literalline, lines)
  ];
}
