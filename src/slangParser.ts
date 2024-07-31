// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { NonterminalNode } from '@nomicfoundation/slang/cst/index.js';
import type { Parser, ParserOptions } from 'prettier';
import type { AstNode } from './types.js';

function parse(
  text: string,
  _parsers: Parser[] | ParserOptions,
  options = _parsers as ParserOptions
): AstNode {
  const compiler = coerce(options.compiler);

  const language = new Language(compiler?.version || '0.8.26');
  const ast = new SlangSourceUnit(
    language.parse(NonterminalKind.SourceUnit, text).tree() as NonterminalNode
  );

  return new SourceUnit(ast, 0, options);
}

export default parse;
