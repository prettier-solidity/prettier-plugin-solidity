import { doc } from 'prettier';

import type { Doc } from 'prettier';
import type { BlockComment } from '../slang-nodes/types.d.ts';

const { hardline, join, literalline } = doc.builders;

function trimmedIndentableLines(lines: string[]): string[] | undefined {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line.
  if (lines.length > 1) {
    const trimmedLines = [];
    for (let line of lines) {
      line = line.trimStart();
      if (!line.startsWith('*')) {
        return;
      }
      trimmedLines.push(line);
    }
    return trimmedLines;
  }
  return;
}

function printIndentableBlockComment(lines: string[]): Doc {
  return join(
    hardline,
    lines.map((line, index) => `${index === 0 ? '' : ' '}${line.trimEnd()}`)
  );
}

export function printBlockComment(comment: BlockComment): Doc {
  // We remove the initial `/` to check if every line starts with `*`
  const lines = comment.value.slice(1).split('\n');
  const trimmedLines = trimmedIndentableLines(lines);

  return [
    '/',
    trimmedLines
      ? printIndentableBlockComment(trimmedLines)
      : join(literalline, lines)
  ];
}
