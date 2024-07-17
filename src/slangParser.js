// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import * as parsers from './slang-nodes/index.js';

function genericParse(ast, offset, options) {
  return new parsers[ast.cst.kind](ast, offset, options);
}

function parse(text, _parsers, options = _parsers) {
  const compiler = coerce(options.compiler);

  const language = new Language(compiler?.version || '0.8.26');
  const ast = new SourceUnit(
    language.parse(NonterminalKind.SourceUnit, text).tree()
  );

  const parsed = genericParse(ast, 0, options);

  return parsed;
}

export default parse;
