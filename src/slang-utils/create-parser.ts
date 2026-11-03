import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { maxSatisfying } from 'semver';

import type { ParseOutput } from '@nomicfoundation/slang/parser';
import type { ParserOptions } from 'prettier';
import type { PrintableNode } from '../slang-nodes/types.d.ts';

const supportedVersions = LanguageFacts.allVersions();
const latestSupportedVersion = LanguageFacts.latestVersion();

// Most files allow the latest version, so we parse with it first and only
// parse again if their pragmas ask for an older one.
const latestParser = Parser.create(latestSupportedVersion);

function validated(
  version: string,
  parseOutput: ParseOutput,
  reason: string
): { version: string; parseOutput: ParseOutput } {
  if (!parseOutput.isValid())
    throw new Error(
      `We encountered the following syntax error:\n\n\t${parseOutput.errors()[0].message}\n\n${reason}`
    );

  return { version, parseOutput };
}

function versionAndOutput(
  text: string,
  version: string,
  reason: string
): { version: string; parseOutput: ParseOutput } {
  return validated(
    version,
    Parser.create(version).parseNonterminal(NonterminalKind.SourceUnit, text),
    reason
  );
}

// The text of every pragma directive in the tree. Slang's version inference
// only looks at pragmas, but given the whole file it analyzes all of it, which
// costs about as much as parsing it.
function pragmasOf(parseOutput: ParseOutput): string {
  const cursor = parseOutput.createTreeCursor();
  let pragmas = '';
  while (cursor.goToNextNonterminalWithKind(NonterminalKind.PragmaDirective)) {
    pragmas += `${cursor.node.unparse()}\n`;
  }
  return pragmas;
}

export function createParser(
  text: string,
  options: ParserOptions<PrintableNode>
): { version: string; parseOutput: ParseOutput } {
  const compiler = maxSatisfying(supportedVersions, options.compiler);
  if (compiler) {
    return versionAndOutput(
      text,
      compiler,
      `Based on the compiler option provided, we inferred your code to be using Solidity version ${compiler}. If you would like to change that, specify a different version in your \`.prettierrc\` file.`
    );
  }

  const latestOutput = latestParser.parseNonterminal(
    NonterminalKind.SourceUnit,
    text
  );
  const inferredRanges = LanguageFacts.inferLanguageVersions(
    pragmasOf(latestOutput)
  );
  const inferredLength = inferredRanges.length;

  if (inferredLength === 0 || inferredLength === supportedVersions.length) {
    return validated(
      latestSupportedVersion,
      latestOutput,
      `We couldn't infer a Solidity version based on the pragma statements in your code so we defaulted to ${latestSupportedVersion}. You might be attempting to use a syntax not yet supported by Slang or you might want to specify a version in your \`.prettierrc\` file.`
    );
  }

  const inferredVersion = inferredRanges[inferredLength - 1];
  const reason = `Based on the pragma statements, we inferred your code to be using Solidity version ${inferredVersion}. If you would like to change that, update the pragmas in your source file, or specify a version in your \`.prettierrc\` file.`;

  return inferredVersion === latestSupportedVersion
    ? validated(latestSupportedVersion, latestOutput, reason)
    : versionAndOutput(text, inferredVersion, reason);
}
