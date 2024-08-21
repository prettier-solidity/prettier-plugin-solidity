// https://prettier.io/docs/en/plugins.html#parsers
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { YulBlock as SlangYulBlock } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import { YulBlock } from './slang-nodes/YulBlock.js';

import type { NonterminalNode } from '@nomicfoundation/slang/cst';
import type { Parser, ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes';

export default function parse(
  text: string,
  _parsers: Parser[] | ParserOptions<AstNode>,
  options = _parsers as ParserOptions<AstNode>
): AstNode {
  const compiler = coerce(options.compiler);
  const supportedVersions = Language.supportedVersions();

  const language = new Language(
    compiler && supportedVersions.includes(compiler.version)
      ? compiler.version
      : supportedVersions[supportedVersions.length - 1]
  );

  const parseOutput = language.parse(NonterminalKind.YulBlock, text);

  if (parseOutput.isValid) {
    return new YulBlock(
      new SlangYulBlock(parseOutput.tree() as NonterminalNode),
      0,
      options
    );
  }
  throw new Error(parseOutput.errors()[0].message());
}
