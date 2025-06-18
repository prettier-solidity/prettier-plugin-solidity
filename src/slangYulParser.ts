// https://prettier.io/docs/en/plugins.html#parsers
import { YulBlock as SlangYulBlock } from '@nomicfoundation/slang/ast';
import { createParser } from './slang-utils/create-parser.js';
import { locStart } from './slang-utils/loc.js';
import { YulBlock } from './slang-nodes/YulBlock.js';

import type { ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): YulBlock {
  const { parser, parseOutput } = createParser(text, options);

  // We update the compiler version with the inferred one.
  options.compiler = parser.languageVersion;
  const comments: Comment[] = [];
  const parsed = new YulBlock(
    new SlangYulBlock(parseOutput.tree.asNonterminalNode()),
    { offsets: new Map<number, number>(), comments },
    options
  );

  // Comments are extracted in nested order; sort them by location.
  parsed.comments = comments.sort((a, b) => locStart(a) - locStart(b));
  return parsed;
}
