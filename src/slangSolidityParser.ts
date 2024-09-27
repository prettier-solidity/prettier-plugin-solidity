// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import {
  SourceUnit as SlangSourceUnit,
  VersionExpressionSets as SlangVersionExpressionSets
} from '@nomicfoundation/slang/ast/index.js';
import { Query } from '@nomicfoundation/slang/query/index.js';
import prettier from 'prettier';
import maxSatisfying from 'semver/ranges/max-satisfying.js';
import minSatisfying from 'semver/ranges/min-satisfying.js';
import major from 'semver/functions/major.js';
import minor from 'semver/functions/minor.js';
import { printWarning } from './slang-utils/print-warning.js';
import slangPrint from './slangPrinter.js';
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

const slangAstId = 'slang-ast';
const slangParserId = 'slang-pragma';

const pragmaOptions = {
  plugins: [
    {
      // No parser function needed as we are gonna provide the AST directly
      parsers: { [slangParserId]: { astFormat: slangAstId } as Parser },
      printers: { [slangAstId]: { print: slangPrint } }
    }
  ],
  parser: slangParserId
};

async function tryToCollectPragmas(
  text: string,
  version: string
): Promise<string> {
  const language = new Language(version);
  const parseOutput = language.parse(NonterminalKind.SourceUnit, text);
  const query = Query.parse('[VersionPragma @sets [VersionExpressionSets]]');
  const matches = parseOutput.createTreeCursor().query([query]);
  const ranges: string[] = [];

  let match;
  while ((match = matches.next())) {
    const sets = new VersionExpressionSets(
      new SlangVersionExpressionSets(
        match.captures.sets[0].node() as NonterminalNode
      ),
      0
    );
    // In order to remove comments attached to this VersionExpressionSets
    sets.comments = [];
    ranges.push(
      (await prettier.__debug.formatAST(sets, pragmaOptions)).formatted
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

async function inferLanguage(text: string): Promise<Language> {
  let inferredRange = '';
  for (const version of milestoneVersions) {
    try {
      inferredRange = await tryToCollectPragmas(text, version);
      break;
    } catch {}
  }
  const maxSatisfyingVersion = maxSatisfying(supportedVersions, inferredRange);

  return maxSatisfyingVersion
    ? new Language(maxSatisfyingVersion)
    : new Language(supportedVersions[supportedVersions.length - 1]);
}

export default async function parse(
  text: string,
  _parsers: Parser[] | ParserOptions<AstNode>,
  options = _parsers as ParserOptions<AstNode>
): Promise<AstNode> {
  const compiler = maxSatisfying(supportedVersions, options.compiler);

  const language =
    compiler && supportedVersions.includes(compiler)
      ? new Language(compiler)
      : await inferLanguage(text);

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
