// https://prettier.io/docs/en/plugins.html#parsers
import { Parser } from '@nomicfoundation/slang/parser';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { maxSatisfying } from 'semver';
import { createParser } from './slang-utils/create-parser.js';
import { printWarning } from './slang-utils/print-warning.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes/types.d.ts';

const supportedVersions = Parser.supportedVersions();

export default async function parse(
  text: string,
  options: ParserOptions<AstNode>
): Promise<AstNode> {
  const compiler = maxSatisfying(supportedVersions, options.compiler);

  const parser =
    compiler && supportedVersions.includes(compiler)
      ? Parser.create(compiler)
      : await createParser(text);

  const parseOutput = parser.parse(NonterminalKind.SourceUnit, text);
  printWarning(
    compiler
      ? `Using version ${parser.version} based on the compiler option provided.`
      : `Inferred version ${parser.version} based on the pragma statements in the code.`
  );

  if (parseOutput.isValid()) {
    // We update the compiler version by the inferred one.
    options.compiler = parser.version;
    return new SourceUnit(
      new SlangSourceUnit(parseOutput.tree.asNonterminalNode()!),
      0,
      options
    );
  }
  throw new Error(parseOutput.errors[0].message);
}
