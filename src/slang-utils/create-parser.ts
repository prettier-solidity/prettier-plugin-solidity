import { VersionExpressionSets as SlangVersionExpressionSets } from '@nomicfoundation/slang/ast';
import { NonterminalKind, Query } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import prettier from 'prettier';
import {
  maxSatisfying,
  minSatisfying,
  minor,
  major,
  satisfies,
  validRange
} from 'semver';
import slangPrint from '../slangPrinter.js';
import { locEnd, locStart } from './loc.js';
import { VersionExpressionSets } from '../slang-nodes/VersionExpressionSets.js';

import type { NonterminalNode } from '@nomicfoundation/slang/cst';
import type { Parser as PrettierParser } from 'prettier';

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

const bypassParse =
  (parseOutput: NonterminalNode) => (): VersionExpressionSets => {
    // We don't need to parse the text twice if we already have the
    // NonterminalNode.
    const parsed = new VersionExpressionSets(
      new SlangVersionExpressionSets(parseOutput),
      0
    );
    parsed.comments = [];
    return parsed;
  };

const options = {
  plugins: [
    {
      languages: [{ name: 'SolidityPragma', parsers: ['slangPragma'] }],
      parsers: {
        slangPragma: {
          astFormat: 'slang-ast',
          locStart,
          locEnd
        } as PrettierParser
      },
      printers: { ['slang-ast']: { print: slangPrint } }
    }
  ],
  parser: 'slangPragma'
};

const query = Query.parse(
  '[VersionPragma @versionRanges [VersionExpressionSets]]'
);

// TODO if we ended up selecting the same version that the pragmas were parsed with,
// should we be able to reuse/just return the already parsed CST, instead of
// returning a Parser and forcing user to parse it again?
export async function createParser(text: string): Promise<Parser> {
  let inferredRanges: string[] = [];

  for (const version of milestoneVersions) {
    try {
      inferredRanges = await tryToCollectPragmas(text, version);
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

async function tryToCollectPragmas(
  text: string,
  version: string
): Promise<string[]> {
  const parser = Parser.create(version);
  const parseOutput = parser.parse(NonterminalKind.SourceUnit, text);

  const matches = parseOutput.createTreeCursor().query([query]);
  const ranges: string[] = [];

  let match;
  while ((match = matches.next())) {
    options.plugins[0].parsers.slangPragma.parse = bypassParse(
      match.captures.versionRanges[0].node.asNonterminalNode()!
    );
    ranges.push(await prettier.format(text, options));
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
