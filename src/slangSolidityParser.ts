// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { inferAndParse } from './slang-utils/infer-and-parse.ts';
import { collectLocations } from './slang-utils/collect-locations.ts';
import { locStart } from './slang-utils/loc.ts';
import { SourceUnit } from './slang-nodes/SourceUnit.ts';

import type { ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): PrintableNode {
  const { version, parseOutput } = inferAndParse(text, options);

  const comments: Comment[] = [];
  const collected = {
    locations: new Map(),
    comments,
    options,
    compiler: version
  };
  collectLocations(parseOutput.createTreeCursor(), collected);
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    collected
  );

  // Comments are extracted in nested order; sort them by location.
  parsed.comments = comments.sort((a, b) => locStart(a) - locStart(b));
  return parsed;
}
