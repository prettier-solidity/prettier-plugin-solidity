// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast/index.js';
import { maxSatisfying } from 'semver';
import { inferLanguage } from './slang-utils/infer-language.js';
import { printWarning } from './slang-utils/print-warning.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { NonterminalNode } from '@nomicfoundation/slang/cst';
import type { Parser, ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes/index.js';

const supportedVersions = Language.supportedVersions();

export default function parse(
  text: string,
  _parsers: Parser[] | ParserOptions<AstNode>,
  options = _parsers as ParserOptions<AstNode>
): AstNode {
  const compiler = maxSatisfying(supportedVersions, options.compiler);

  const language =
    compiler && supportedVersions.includes(compiler)
      ? new Language(compiler)
      : inferLanguage(text);

  const parseOutput = language.parse(NonterminalKind.SourceUnit, text);
  printWarning(
    compiler
      ? `Using version ${language.version} based on the compiler option provided.`
      : `Inferred version ${language.version} based on the pragma statements in the code.`
  );

  if (parseOutput.isValid) {
    // We update the compiler version by the inferred one.
    options.compiler = language.version;
    return new SourceUnit(
      new SlangSourceUnit(parseOutput.tree() as NonterminalNode),
      0,
      options
    );
  }
  throw new Error(parseOutput.errors()[0].message());
}
