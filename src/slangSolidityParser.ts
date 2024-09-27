// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import {
  SourceUnit as SlangSourceUnit,
  VersionExpressionSets as SlangVersionExpressionSets
} from '@nomicfoundation/slang/ast/index.js';
import { Query } from '@nomicfoundation/slang/query/index.js';
import { maxSatisfying, minSatisfying, minor, major } from 'semver';
import { printWarning } from './slang-utils/print-warning.js';
import { SourceUnit } from './slang-nodes/SourceUnit.js';
import { VersionExpressionSets } from './slang-nodes/VersionExpressionSets.js';

import type { NonterminalNode } from '@nomicfoundation/slang/cst';
import type { Parser, ParserOptions } from 'prettier';
import type { AstNode } from './slang-nodes/index.js';

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

function inferLanguage(text: string): Language {
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

export default function parse(
  text: string,
  _parsers: Parser[] | ParserOptions<AstNode>,
  options = _parsers as ParserOptions<AstNode>
): AstNode {
  const compiler = maxSatisfying(supportedVersions, options.compiler);

  const language =
    compiler && supportedVersions.includes(compiler)
      ? new Language(compiler)
      : inferLanguage(text);

  const parseOutput = language.parse(NonterminalKind.SourceUnit, text);
  printWarning(
    compiler
      ? `Using version ${language.version} based on the compiler option provided.`
      : `Inferred version ${language.version} based on the pragma statements in the code.`
  );

  if (parseOutput.isValid) {
    // We update the compiler version by the inferred one.
    options.compiler = language.version;
    return new SourceUnit(
      new SlangSourceUnit(parseOutput.tree() as NonterminalNode),
      0,
      options
    );
  }
  throw new Error(parseOutput.errors()[0].message());
}
