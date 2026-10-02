// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { createParser } from './slang-utils/create-parser.ts';
import { collectMetadata } from './slang-utils/collect-metadata.ts';
import { SourceUnit } from './slang-nodes/SourceUnit.ts';

import type { ParserOptions } from 'prettier';
import type { PrintableNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): PrintableNode {
  const { parser, parseOutput } = createParser(text, options);

  // We update the compiler version with the inferred one.
  options.compiler = parser.languageVersion;
  const { locations, comments } = collectMetadata(
    parseOutput.createTreeCursor(),
    options.originalText
  );
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    { locations, options }
  );

  parsed.comments = comments;
  return parsed;
}
