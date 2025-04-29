import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { createParser } from '../../../src/slang-utils/create-parser.js';

describe('inferLanguage', function () {
  const latestSupportedVersion = LanguageFacts.latestVersion();
  const options = { filepath: 'test.sol' };

  const fixtures = [
    {
      description: 'Caret range',
      source: `pragma solidity ^0.7.0;`,
      version: '0.7.6'
    },
    {
      description: 'Pinned version',
      source: `pragma solidity 0.8.1;`,
      version: '0.8.1'
    },
    {
      description: 'With nightly commit',
      source: `pragma solidity 0.8.18-ci.2023.1.17+commit.e7b959af;`,
      version: '0.8.18'
    },
    {
      description: 'Caret range and pinned version',
      source: `pragma solidity ^0.8.0; pragma solidity 0.8.2;`,
      version: '0.8.2'
    },
    {
      description: 'With multiline comment before the range',
      source: `pragma solidity /* comment */ 0.8.2;`,
      version: '0.8.2'
    },
    {
      description: 'With natspec comment before the range',
      source: `pragma solidity /** comment */ 0.8.2;`,
      version: '0.8.2'
    },
    {
      description: 'With multiline comment between the ranges',
      source: `pragma solidity ^0.8.0 /* comment */ 0.8.2;`,
      version: '0.8.2'
    },
    {
      description: 'With natspec comment between the ranges',
      source: `pragma solidity ^0.8.0 /** comment */ 0.8.2;`,
      version: '0.8.2'
    },
    {
      description: 'With multiline comment after the range',
      source: `pragma solidity 0.8.2 /* comment */;`,
      version: '0.8.2'
    },
    {
      description: 'With natspec comment after the range',
      source: `pragma solidity 0.8.2 /** comment */;`,
      version: '0.8.2'
    },
    {
      description: 'With tracing line comment',
      source: `pragma solidity 0.8.2; // line comment`,
      version: '0.8.2'
    },
    {
      description: 'With line comment between "solidity" and the version',
      source: `pragma solidity
// line comment
0.8.2;`,
      version: '0.8.2'
    },
    {
      description:
        'should use the latest version if the range is outside the supported versions',
      source: `pragma solidity ^0.8.27;`,
      version: latestSupportedVersion
    }
  ];

  for (const { description, source, version } of fixtures) {
    test(description, function () {
      const [parser] = createParser(source, options);
      expect(parser.languageVersion).toEqual(version);
    });
  }

  test('should use the latest successful version if the source has no pragmas', function () {
    // This is to create in memory the latest parser and review the behaviour
    createParser(`pragma solidity ${latestSupportedVersion};`, options);
    let [parser] = createParser(`contract Foo {}`, options);
    expect(parser.languageVersion).toEqual(latestSupportedVersion);

    // This is to create in memory an old parser and review the behaviour
    createParser(`pragma solidity 0.8.2;`, options);
    [parser] = createParser(`contract Foo {}`, options);
    expect(parser.languageVersion).toEqual(latestSupportedVersion);

    [parser] = createParser(`contract Foo {byte bar;}`, options);
    expect(parser.languageVersion).toEqual('0.7.6');
  });

  test('should use compiler option if given', function () {
    let [parser] = createParser(`pragma solidity ^0.8.0;`, {
      compiler: '0.8.20'
    });
    expect(parser.languageVersion).toEqual('0.8.20');

    [parser] = createParser(`pragma solidity ^0.8.0;`, {
      compiler: '0.8.2'
    });
    expect(parser.languageVersion).toEqual('0.8.2');

    [parser] = createParser(`pragma solidity ^0.8.0;`, {});
    expect(parser.languageVersion).toEqual(latestSupportedVersion);
  });

  test('should throw when a pragma is broken by new lines, whitespace and comments', function () {
    expect(() =>
      createParser(
        `pragma solidity 0.
    // comment 1
                       7.
    /* comment 2*/
           3;`,
        options
      )
    ).toThrow(
      "Couldn't infer any version from the ranges in the pragmas for file test.sol"
    );
    expect(() =>
      createParser(
        `pragma solidity 0.
    // comment 1
                       7.
    /* comment 2*/
           3;`,
        {}
      )
    ).toThrow("Couldn't infer any version from the ranges in the pragmas");
  });

  test.skip('should throw an error if there are incompatible ranges', function () {
    expect(() =>
      createParser(`pragma solidity ^0.8.0; pragma solidity 0.7.6;`, options)
    ).toThrow();
  });
});
