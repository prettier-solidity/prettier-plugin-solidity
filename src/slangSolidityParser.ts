// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { parseSourceUnit } from './slang-utils/parse-source-unit.ts';
import { locStart } from './slang-utils/loc.ts';
import { SourceUnit } from './slang-nodes/SourceUnit.ts';

import type { ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): PrintableNode {
  const { version, parseOutput } = parseSourceUnit(text, options);

  // We update the compiler version with the inferred one.
  options.compiler = version;
  const comments: Comment[] = [];
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    { offsets: new Map<number, number>(), comments, options }
  );

  // Comments are extracted in nested order; sort them by location.
  parsed.comments = comments.sort((a, b) => locStart(a) - locStart(b));
  return parsed;
}
