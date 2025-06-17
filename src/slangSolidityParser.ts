// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { clearOffsets } from './slang-utils/metadata.js';
import { createParser } from './slang-utils/create-parser.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<AstNode>
): AstNode {
  const { parser, parseOutput } = createParser(text, options);

  // We update the compiler version by the inferred one.
  options.compiler = parser.languageVersion;
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    options
  );
  clearOffsets();
  return parsed;
}
