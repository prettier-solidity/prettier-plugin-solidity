// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { NonterminalNode } from '@nomicfoundation/slang/cst';
import type { Parser, ParserOptions } from 'prettier';
import type { AstNode } from './types';

function parse(
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

  const ast = new SlangSourceUnit(
    language.parse(NonterminalKind.SourceUnit, text).tree() as NonterminalNode
  );

  return new SourceUnit(ast, 0, options);
}

export default parse;
