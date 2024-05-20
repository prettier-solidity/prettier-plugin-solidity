// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { RuleKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit } from '@nomicfoundation/slang/ast/index.js';
import * as parsers from './slang-nodes/index.js';

function genericParse(ast, options, parseFunction) {
  return parsers[ast.cst.kind].parse({ ast, options, parse: parseFunction });
}

function parse(text, _parsers, options = _parsers) {
  // const compiler = coerce(options.compiler);
  const language = new Language('0.8.0');
  const parsed = new SourceUnit(
    language.parse(RuleKind.SourceUnit, text).tree()
  );

  return genericParse(parsed, options, genericParse);
}

export default parse;