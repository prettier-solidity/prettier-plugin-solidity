import { VersionExpressionSets as SlangVersionExpressionSets } from '@nomicfoundation/slang/ast';
import { NonterminalKind, Query } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import {
  maxSatisfying,
  minSatisfying,
  minor,
  major,
  satisfies,
  validRange
} from 'semver';
import { VersionExpressionSets } from '../slang-nodes/VersionExpressionSets.js';

import type { ParseOutput } from '@nomicfoundation/slang/parser';
import type { ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes/types.js';

const supportedVersions = LanguageFacts.allVersions();

const milestoneVersions = Array.from(
  supportedVersions.reduce((minorRanges, version) => {
    minorRanges.add(`^${major(version)}.${minor(version)}.0`);
    return minorRanges;
  }, new Set<string>())
)
  .reverse()
  .reduce((versions: string[], range) => {
    versions.push(maxSatisfying(supportedVersions, range)!);
    versions.push(minSatisfying(supportedVersions, range)!);
    return versions;
  }, []);

const queries = [
  Query.create('[VersionPragma @versionRanges [VersionExpressionSets]]')
];

let parser: Parser;

export function createParser(
  text: string,
  options: ParserOptions<AstNode>
): [Parser, ParseOutput] {
  const compiler = maxSatisfying(supportedVersions, options.compiler);
  if (compiler) {
    if (!parser || parser.languageVersion !== compiler) {
      parser = Parser.create(compiler);
    }
    return [parser, parser.parseNonterminal(NonterminalKind.SourceUnit, text)];
  }

  let isCachedParser = false;
  if (parser) {
    isCachedParser = true;
  } else {
    parser = Parser.create(milestoneVersions[0]);
  }

  let parseOutput;
  let inferredRanges: string[] = [];

  try {
    parseOutput = parser.parseNonterminal(NonterminalKind.SourceUnit, text);
    inferredRanges = tryToCollectPragmas(parseOutput, parser, isCachedParser);
  } catch {
    for (
      let i = isCachedParser ? 0 : 1;
      i <= milestoneVersions.length;
      i += 1
    ) {
      try {
        const version = milestoneVersions[i];
        parser = Parser.create(version);
        parseOutput = parser.parseNonterminal(NonterminalKind.SourceUnit, text);
        inferredRanges = tryToCollectPragmas(parseOutput, parser);
        break;
      } catch {
        continue;
      }
    }
  }

  const satisfyingVersions = inferredRanges.reduce(
    (versions, inferredRange) => {
      if (!validRange(inferredRange)) {
        throw new Error(
          `Couldn't infer any version from the ranges in the pragmas${options.filepath ? ` for file ${options.filepath}` : ''}`
        );
      }
      return versions.filter((supportedVersion) =>
        satisfies(supportedVersion, inferredRange)
      );
    },
    supportedVersions
  );

  const inferredVersion =
    satisfyingVersions.length > 0
      ? satisfyingVersions[satisfyingVersions.length - 1]
      : supportedVersions[supportedVersions.length - 1];

  if (inferredVersion !== parser.languageVersion) {
    parser = Parser.create(inferredVersion);
    parseOutput = parser.parseNonterminal(NonterminalKind.SourceUnit, text);
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return [parser, parseOutput!];
}

function tryToCollectPragmas(
  parseOutput: ParseOutput,
  parser: Parser,
  isCachedParser = false
): string[] {
  const matches = parseOutput.createTreeCursor().query(queries);
  const ranges: string[] = [];

  let match;
  while ((match = matches.next())) {
    const versionRange = new SlangVersionExpressionSets(
      match.captures.versionRanges[0].node.asNonterminalNode()!
    );
    ranges.push(
      // Replace all comments that could be in the expression with whitespace
      new VersionExpressionSets(versionRange).comments.reduce(
        (range, comment) => range.replace(comment.value, ' '),
        versionRange.cst.unparse()
      )
    );
  }

  if (ranges.length === 0) {
    // If we didn't find pragmas but succeeded parsing the source we keep it.
    if (!isCachedParser && parseOutput.isValid()) {
      return [parser.languageVersion];
    }
    // Otherwise we throw.
    throw new Error(
      `Using version ${parser.languageVersion} did not find any pragma statement and does not parse without errors.`
    );
  }

  return ranges;
}
