// https://prettier.io/docs/en/plugins.html#parsers
import { Parser } from '@nomicfoundation/slang/parser';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { maxSatisfying } from 'semver';
import { inferLanguage } from './slang-utils/infer-language.js';
import { printWarning } from './slang-utils/print-warning.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { Parser as PrettierParser, ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes/index.d.ts';

const supportedVersions = Parser.supportedVersions();

export default function parse(
  text: string,
  _parsers: PrettierParser[] | ParserOptions<AstNode>,
  options = _parsers as ParserOptions<AstNode>
): AstNode {
  const compiler = maxSatisfying(supportedVersions, options.compiler);

  const language =
    compiler && supportedVersions.includes(compiler)
      ? Parser.create(compiler)
      : inferLanguage(text);

  const parseOutput = language.parse(NonterminalKind.SourceUnit, text);
  printWarning(
    compiler
      ? `Using version ${language.version} based on the compiler option provided.`
      : `Inferred version ${language.version} based on the pragma statements in the code.`
  );

  if (parseOutput.isValid()) {
    // We update the compiler version by the inferred one.
    options.compiler = language.version;
    return new SourceUnit(
      new SlangSourceUnit(parseOutput.tree.asNonterminalNode()!),
      0,
      options
    );
  }
  throw new Error(parseOutput.errors[0].message);
}
