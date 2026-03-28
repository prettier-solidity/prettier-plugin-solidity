import { doc } from 'prettier';

import type { Doc } from 'prettier';
import type { BlockComment } from '../slang-nodes/types.d.ts';

const { hardline, join, literalline } = doc.builders;

function printIndentableBlockComment(lines: string[]): Doc {
  return join(
    hardline,
    lines.map((line, index) => `${index === 0 ? '' : ' '}${line.trimEnd()}`)
  );
}

export function printBlockComment(comment: BlockComment): Doc {
  // We remove the initial `/` to check if every line starts with `*`
  const lines = comment.value.slice(1).split('\n');
  let trimmedLines;

  // Only process lines for possible indentation if the block has multiple
  // lines
  if (lines.length > 1) {
    trimmedLines = lines.map((line) => line.trimStart());
  }

  return [
    '/',
    // If the comment has multiple lines and every line starts with a star
    // we can fix the indentation of each line.
    trimmedLines?.every((line) => line.startsWith('*'))
      ? printIndentableBlockComment(trimmedLines)
      : join(literalline, lines)
  ];
}
