// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { createParser } from './slang-utils/create-parser.ts';
import { collectMetadata } from './slang-utils/collect-metadata.ts';
import { SourceUnit } from './slang-nodes/SourceUnit.ts';

import type { ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): PrintableNode {
  const { version, parseOutput } = createParser(text, options);

  const comments: Comment[] = [];
  const collected = {
    locations: new Map(),
    comments,
    options,
    compiler: version
  };
  collectMetadata(parseOutput.createTreeCursor(), collected);
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    collected
  );

  parsed.comments = comments;
  return parsed;
}
