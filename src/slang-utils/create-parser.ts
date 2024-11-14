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

// TODO if we ended up selecting the same version that the pragmas were parsed with,
// should we be able to reuse/just return the already parsed CST, instead of
// returning a Parser and forcing user to parse it again?
export function createParser(text: string): Parser {
  let inferredRanges: string[] = [];

  for (const version of milestoneVersions) {
    try {
      inferredRanges = tryToCollectPragmas(text, version);
      break;
    } catch {}
  }

  const satisfyingVersions = inferredRanges.reduce(
    (versions, inferredRange) => {
      if (!validRange(inferredRange)) {
        throw new Error(
          "Couldn't infer any version from the ranges in the pragmas."
        );
      }
      return versions.filter((supportedVersion) =>
        satisfies(supportedVersion, inferredRange)
      );
    },
    supportedVersions
  );

  return satisfyingVersions.length > 0
    ? Parser.create(satisfyingVersions[satisfyingVersions.length - 1])
    : Parser.create(supportedVersions[supportedVersions.length - 1]);
}

function tryToCollectPragmas(text: string, version: string): string[] {
  const language = Parser.create(version);
  const parseOutput = language.parse(NonterminalKind.SourceUnit, text);
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
      return [version];
    }
    // Otherwise we throw.
    throw new Error(
      `Using version ${version} did not find any pragma statement and does not parse without errors.`
    );
  }

  return ranges;
}
