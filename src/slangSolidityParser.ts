// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { createParser } from './slang-utils/create-parser.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { ParserOptions } from 'prettier';
import type { AstNode, Comment } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<AstNode>
): AstNode {
  const { parser, parseOutput } = createParser(text, options);

  // We update the compiler version by the inferred one.
  options.compiler = parser.languageVersion;
  const comments: Comment[] = [];
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    { offsets: new Map<number, number>(), comments },
    options
  );

  // Because of comments being extracted like a Russian doll, the order needs
  // to be fixed at the end.
  parsed.comments = comments.sort((a, b) => a.loc.start - b.loc.start);
  return parsed;
}
