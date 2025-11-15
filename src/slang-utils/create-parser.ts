import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { maxSatisfying } from 'semver';
import { slangParserId, slangYulParserId } from '../constants.js';

import type { ParseOutput } from '@nomicfoundation/slang/parser';
import type { ParserOptions } from 'prettier';
import type { PrintableNode } from '../slang-nodes/types.d.ts';

const supportedVersions = LanguageFacts.allVersions();
const supportedLength = supportedVersions.length;
const latestSupportedVersion = LanguageFacts.latestVersion();
const rootKindMap = new Map<
  ParserOptions<PrintableNode>['parser'],
  NonterminalKind
>([
  [slangParserId, NonterminalKind.SourceUnit],
  [slangYulParserId, NonterminalKind.YulBlock]
]);

function parserAndOutput(
  text: string,
  version: string,
  { parser: optionsParser }: ParserOptions<PrintableNode>,
  reason: string
): { parser: Parser; parseOutput: ParseOutput } {
  const rootKind = rootKindMap.get(optionsParser);

  if (rootKind === undefined) {
    throw new Error(
      `Parser '${optionsParser as string}' is not supported for Language Inference.`
    );
  }

  const parser = Parser.create(version);
  const parseOutput = parser.parseNonterminal(rootKind, text);

  if (!parseOutput.isValid())
    throw new Error(
      `We encountered the following syntax error:\n\n\t${parseOutput.errors()[0].message}\n\n${reason}`
    );

  return { parser, parseOutput };
}

export function createParser(
  text: string,
  options: ParserOptions<PrintableNode>
): { parser: Parser; parseOutput: ParseOutput } {
  const compiler = maxSatisfying(supportedVersions, options.compiler);
  if (compiler) {
    return parserAndOutput(
      text,
      compiler,
      options,
      `Based on the compiler option provided, we inferred your code to be using Solidity version ${compiler}. If you would like to change that, specify a different version in your \`.prettierrc\` file.`
    );
  }

  const inferredRanges: string[] = LanguageFacts.inferLanguageVersions(text);
  const inferredLength = inferredRanges.length;

  if (inferredLength === 0 || inferredLength === supportedLength) {
    return parserAndOutput(
      text,
      latestSupportedVersion,
      options,
      `We couldn't infer a Solidity version based on the pragma statements in your code so we defaulted to ${latestSupportedVersion}. You might be attempting to use a syntax not yet supported by Slang or you might want to specify a version in your \`.prettierrc\` file.`
    );
  }

  const inferredVersion = inferredRanges[inferredLength - 1];
  return parserAndOutput(
    text,
    inferredVersion,
    options,
    `Based on the pragma statements, we inferred your code to be using Solidity version ${inferredVersion}. If you would like to change that, update the pragmas in your source file, or specify a version in your \`.prettierrc\` file.`
  );
}
