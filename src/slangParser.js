// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import * as parsers from './slang-nodes/index.js';

function createGenericParse(options, comments) {
  return function genericParse(ast, offset = 0) {
    return new parsers[ast.cst.kind](ast, offset, comments, options);
  };
}

function parse(text, _parsers, options = _parsers) {
  const compiler = coerce(options.compiler);

  const language = new Language(compiler?.version || '0.8.25');
  const ast = new SourceUnit(
    language.parse(NonterminalKind.SourceUnit, text).tree()
  );

  const comments = [];

  const genericParse = createGenericParse(options, comments);
  const parsed = genericParse(ast);

  parsed.comments = comments;

  return parsed;
}

export default parse;
