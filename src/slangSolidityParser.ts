// https://prettier.io/docs/en/plugins.html#parsers
import { Parser } from '@nomicfoundation/slang/parser';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { maxSatisfying } from 'semver';
import { clearOffsets } from './slang-utils/metadata.js';
import { createParser } from './slang-utils/create-parser.js';
import { printWarning } from './slang-utils/print-warning.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes/types.d.ts';

const supportedVersions = Parser.supportedVersions();

export default function parse(
  text: string,
  options: ParserOptions<AstNode>
): AstNode {
  const compiler = maxSatisfying(supportedVersions, options.compiler);

  const parser =
    compiler && supportedVersions.includes(compiler)
      ? Parser.create(compiler)
      : createParser(text, options.filepath);

  const parseOutput = parser.parse(NonterminalKind.SourceUnit, text);
  printWarning(
    compiler
      ? `Using version ${parser.version} based on the compiler option provided.`
      : `Inferred version ${parser.version} based on the pragma statements in the code.`
  );

  if (parseOutput.isValid()) {
    // We update the compiler version by the inferred one.
    options.compiler = parser.version;
    const parsed = new SourceUnit(
      new SlangSourceUnit(parseOutput.tree.asNonterminalNode()!),
      options
    );
    clearOffsets();
    return parsed;
  }
  throw new Error(parseOutput.errors[0].message);
}
