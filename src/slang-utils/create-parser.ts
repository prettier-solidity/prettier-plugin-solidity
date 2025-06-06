import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { maxSatisfying } from 'semver';

import type { ParseOutput } from '@nomicfoundation/slang/parser';
import type { ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes/types.js';

const supportedVersions = LanguageFacts.allVersions();

// This list was retrieved from Slang's documentation.
// https://nomicfoundation.github.io/slang/latest/solidity-grammar/supported-versions/
// TODO: use the run-time functionality if NomicFoundation decides to expose
// this information directly.
const milestoneVersions = [
  '0.4.14',
  '0.4.16',
  '0.4.21',
  '0.4.22',
  '0.4.25',
  '0.5.0',
  '0.5.3',
  '0.5.5',
  '0.5.8',
  '0.5.10',
  '0.5.14',
  '0.6.0',
  '0.6.2',
  '0.6.5',
  '0.6.7',
  '0.6.8',
  '0.6.11',
  '0.7.0',
  '0.7.1',
  '0.7.4',
  '0.8.0',
  '0.8.4',
  '0.8.8',
  '0.8.13',
  '0.8.18',
  '0.8.19',
  '0.8.22',
  '0.8.27',
  '0.8.29'
].map(
  // Since we are aiming to find the highest compatible Language version, we
  // define a milestone as the highest possible supported version that is
  // smaller than the original milestone taken from the documentation.
  // This has an extra cost in execution time and the actual list could be
  // hardcoded, but the calculation is done only once and it's easier to
  // maintain.
  (milestone) => maxSatisfying(supportedVersions, `<${milestone}`)!
);

function parserAndOutput(
  text: string,
  version: string
): { parser: Parser; parseOutput: ParseOutput } {
  const parser = Parser.create(version);
  return {
    parser,
    parseOutput: parser.parseNonterminal(NonterminalKind.SourceUnit, text)
  };
}

export function createParser(
  text: string,
  options: ParserOptions<AstNode>
): { parser: Parser; parseOutput: ParseOutput } {
  const compiler = maxSatisfying(supportedVersions, options.compiler);
  if (compiler) return parserAndOutput(text, compiler);

  const inferredRanges: string[] = LanguageFacts.inferLanguageVersions(text);

  let result = parserAndOutput(text, inferredRanges[inferredRanges.length - 1]);
  if (result.parseOutput.isValid()) return result;

  const inferredMilestones = milestoneVersions.filter((milestone) =>
    inferredRanges.includes(milestone)
  );

  for (let i = inferredMilestones.length - 1; i >= 0; i -= 1) {
    result = parserAndOutput(text, inferredMilestones[i]);
    if (result.parseOutput.isValid()) break;
  }

  return result;
}
