// https://prettier.io/docs/en/plugins.html#parsers
import { YulBlock as SlangYulBlock } from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { coerce } from 'semver';
import { clearOffsets } from './slang-utils/metadata.js';
import { YulBlock } from './slang-nodes/YulBlock.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes/types.d.ts';

export default function parse(
  text: string,
  options: ParserOptions<AstNode>
): AstNode {
  // const [parser, parseOutput] = createParser(text, options);
  const compiler = coerce(options.compiler);
  const supportedVersions = LanguageFacts.allVersions();

  const parser = Parser.create(
    compiler && supportedVersions.includes(compiler.version)
      ? compiler.version
      : supportedVersions[supportedVersions.length - 1]
  );

  const parseOutput = parser.parseNonterminal(NonterminalKind.YulBlock, text);

  if (parseOutput.isValid()) {
    // We update the compiler version by the inferred one.
    options.compiler = parser.languageVersion;
    const parsed = new YulBlock(
      new SlangYulBlock(parseOutput.tree.asNonterminalNode()),
      options
    );
    clearOffsets();
    return parsed;
  }
  throw new Error(parseOutput.errors()[0].message);
}
