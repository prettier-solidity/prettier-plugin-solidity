import { VersionExpressionSets as SlangVersionExpressionSets } from '@nomicfoundation/slang/ast/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { Query } from '@nomicfoundation/slang/query/index.js';
import { maxSatisfying, minSatisfying, minor, major } from 'semver';
import { VersionExpressionSets } from '../slang-nodes/VersionExpressionSets.js';

import type { NonterminalNode } from '@nomicfoundation/slang/cst';

const supportedVersions = Language.supportedVersions();

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

export function inferLanguage(text: string): Language {
  let inferredRange = '';
  for (const version of milestoneVersions) {
    try {
      inferredRange = tryToCollectPragmas(text, version);
      break;
    } catch {}
  }
  const maxSatisfyingVersion = maxSatisfying(supportedVersions, inferredRange);

  return maxSatisfyingVersion
    ? new Language(maxSatisfyingVersion)
    : new Language(supportedVersions[supportedVersions.length - 1]);
}

function tryToCollectPragmas(text: string, version: string): string {
  const language = new Language(version);
  const parseOutput = language.parse(NonterminalKind.SourceUnit, text);
  const query = Query.parse(
    '[VersionPragma @versionRanges [VersionExpressionSets]]'
  );
  const matches = parseOutput.createTreeCursor().query([query]);
  const ranges: string[] = [];

  let match;
  while ((match = matches.next())) {
    const versionRange = new SlangVersionExpressionSets(
      match.captures.versionRanges[0].node() as NonterminalNode
    );
    ranges.push(
      // Replace all comments that could be in the expression with whitespace
      new VersionExpressionSets(versionRange, 0).comments.reduce(
        (range, comment) => range.replace(comment.value, ' '),
        versionRange.cst.unparse()
      )
    );
  }

  // Check if we found pragmas.
  if (ranges.length === 0) {
    // If we didn't find pragmas but succeeded parsing the source we keep it.
    if (parseOutput.isValid) {
      return version;
    }
    // Otherwise we throw.
    throw new Error(
      `Using version ${version} did not find any pragma statement and does not parse without errors.`
    );
  }

  return ranges.join(' ');
}
