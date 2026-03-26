import { doc } from 'prettier';

import type { Doc } from 'prettier';
import type { BlockComment } from '../slang-nodes/types.d.ts';

const { hardline, join } = doc.builders;

export function printIndentableBlockComment({ lines }: BlockComment): Doc {
  return join(
    hardline,
    lines.map((line, index) =>
      index === 0
        ? `/${line.trimEnd()}`
        : ` ${index < lines.length - 1 ? line.trim() : line.trimStart()}`
    )
  );
}
