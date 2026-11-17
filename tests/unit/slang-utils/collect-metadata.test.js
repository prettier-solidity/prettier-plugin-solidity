import {
  NonterminalKind,
  TerminalKindExtensions
} from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { collectMetadata } from '../../../src/slang-utils/collect-metadata.ts';

// `collectMetadata` decides the kind of a comment by how its text starts,
// instead of asking Slang. These tests make sure both keep agreeing.
describe('collectMetadata', function () {
  const comments = [
    '//',
    '// comment',
    '///',
    '/// comment',
    '//// comment',
    '///// comment',
    '/**/',
    '/* comment */',
    '/*/ comment */',
    '/***/',
    '/** comment */',
    '/*** comment */',
    '/**** comment */',
    '/** comment **/',
    '/**\n * comment\n */'
  ];
  const sources = [
    ...comments.map((comment) => `${comment}\ncontract C {}\n`),
    // All of them together, to make sure the locations keep being right.
    `${comments.join('\n')}\ncontract C {\n${comments.join('\n')}\n}\n`
  ];
  const versions = [
    LanguageFacts.allVersions()[0],
    LanguageFacts.latestVersion()
  ];

  // The comments as Slang sees them.
  function slangComments(cursor) {
    const collected = [];
    do {
      const { node } = cursor;
      if (
        node.isTerminalNode() &&
        TerminalKindExtensions.isTrivia(node.kind) &&
        node.kind.endsWith('Comment')
      ) {
        collected.push({
          kind: node.kind,
          value: node.unparse(),
          start: cursor.textRange.start.utf16,
          end: cursor.textRange.end.utf16
        });
      }
    } while (cursor.goToNext());
    return collected;
  }

  for (const version of versions) {
    const parser = Parser.create(version);

    for (const source of sources) {
      test(`[${version}] ${JSON.stringify(source)}`, function () {
        const parseOutput = parser.parseNonterminal(
          NonterminalKind.SourceUnit,
          source
        );
        const expected = slangComments(parseOutput.createTreeCursor());
        const { comments: collected } = collectMetadata(
          parseOutput.createTreeCursor(),
          source
        );

        // Making sure we are not comparing two empty lists.
        expect(expected.length).toBeGreaterThan(0);
        expect(
          collected.map(({ kind, value, loc: { start, end } }) => ({
            kind,
            value,
            start,
            end
          }))
        ).toEqual(expected);
      });
    }
  }
});
