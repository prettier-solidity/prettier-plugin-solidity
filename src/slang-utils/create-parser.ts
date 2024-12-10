import { VersionExpressionSets as SlangVersionExpressionSets } from '@nomicfoundation/slang/ast';
import { NonterminalKind, Query } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
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

const supportedVersions = Parser.supportedVersions();

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

const query = Query.parse(
  '[VersionPragma @versionRanges [VersionExpressionSets]]'
);

let parser: Parser;

export function createParser(
  text: string,
  options: ParserOptions<AstNode>
): [Parser, ParseOutput] {
  const compiler = maxSatisfying(supportedVersions, options.compiler);
  if (compiler) {
    if (parser?.version !== compiler) {
      parser = Parser.create(compiler);
    }
    return [parser, parser.parse(NonterminalKind.SourceUnit, text)];
  }

  parser = parser ?? Parser.create(milestoneVersions[0]);
  let parseOutput;
  let inferredRanges: string[] = [];

  try {
    parseOutput = parser.parse(NonterminalKind.SourceUnit, text);
    inferredRanges = tryToCollectPragmas(parseOutput, parser);
  } catch {
    for (
      let i = parser.version === milestoneVersions[0] ? 1 : 0;
      i <= milestoneVersions.length;
      i += 1
    ) {
      try {
        const version = milestoneVersions[i];
        parser = Parser.create(version);
        parseOutput = parser.parse(NonterminalKind.SourceUnit, text);
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

  if (inferredVersion !== parser.version) {
    parser = Parser.create(inferredVersion);
    parseOutput = parser.parse(NonterminalKind.SourceUnit, text);
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return [parser, parseOutput!];
}

function tryToCollectPragmas(
  parseOutput: ParseOutput,
  parser: Parser
): string[] {
  const matches = parseOutput.createTreeCursor().query([query]);
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
    if (parseOutput.isValid()) {
      return [parser.version];
    }
    // Otherwise we throw.
    throw new Error(
      `Using version ${parser.version} did not find any pragma statement and does not parse without errors.`
    );
  }

  return ranges;
}
