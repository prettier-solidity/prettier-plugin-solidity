// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { inferAndParse } from './slang-utils/infer-and-parse.ts';
import { collectMetadata } from './slang-utils/collect-metadata.ts';
import { SourceUnit } from './slang-nodes/SourceUnit.ts';

import type { ParserOptions } from 'prettier';
import type { PrintableNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): PrintableNode {
  const { version, parseOutput } = inferAndParse(text, options);

  const { locations, comments } = collectMetadata(
    parseOutput.createTreeCursor(),
    options.originalText
  );
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    { locations, options, compiler: version }
  );

  parsed.comments = comments;
  return parsed;
}
