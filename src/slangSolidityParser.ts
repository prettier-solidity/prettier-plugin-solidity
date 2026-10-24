// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { createParser } from './slang-utils/create-parser.ts';
import { locStart } from './slang-utils/loc.ts';
import { SourceUnit } from './slang-nodes/SourceUnit.ts';

import type { ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): PrintableNode {
  const { parser, parseOutput } = createParser(text, options);

  const comments: Comment[] = [];
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    {
      offsets: new Map<number, number>(),
      comments,
      options,
      compiler: parser.languageVersion
    }
  );

  // Comments are extracted in nested order; sort them by location.
  parsed.comments = comments.sort((a, b) => locStart(a) - locStart(b));
  return parsed;
}
