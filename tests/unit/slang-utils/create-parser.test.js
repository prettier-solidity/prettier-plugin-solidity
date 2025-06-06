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
      version: '0.8.18',
      // TODO: unskip this test when addresses this issue
      // https://github.com/NomicFoundation/slang/issues/1346
      skip: true
    },
    {
      description: 'Caret range and pinned version',
      source: `pragma solidity ^0.8.0; pragma solidity 0.8.2;`,
      version: '0.8.2'
    },
    {
      description: 'pragma is broken by new lines, whitespace and comments',
      source: `pragma solidity 0.
    // comment 1
                       7.
    /* comment 2*/
           3;`,
      version: '0.7.3'
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

  for (const { description, source, version, skip } of fixtures) {
    (skip ? test.skip : test)(description, function () {
      const { parser } = createParser(source, options);
      expect(parser.languageVersion).toEqual(version);
    });
  }

  test('should use the latest successful version if the source has no pragmas', function () {
    let { parser } = createParser(`contract Foo {}`, options);
    expect(parser.languageVersion).toEqual(latestSupportedVersion);

    ({ parser } = createParser(`contract Foo {}`, options));
    expect(parser.languageVersion).toEqual(latestSupportedVersion);

    ({ parser } = createParser(`contract Foo {byte bar;}`, options));
    expect(parser.languageVersion).toEqual('0.7.6');
  });

  test('should use compiler option if given', function () {
    let { parser } = createParser(`pragma solidity ^0.8.0;`, {
      compiler: '0.8.20'
    });
    expect(parser.languageVersion).toEqual('0.8.20');

    ({ parser } = createParser(`pragma solidity ^0.8.0;`, {
      compiler: '0.8.2'
    }));
    expect(parser.languageVersion).toEqual('0.8.2');

    ({ parser } = createParser(`pragma solidity ^0.8.0;`, {}));
    expect(parser.languageVersion).toEqual(latestSupportedVersion);
  });

  test('should throw an error if there are incompatible ranges', function () {
    expect(() =>
      createParser(`pragma solidity ^0.8.0; pragma solidity 0.7.6;`, options)
    ).toThrow();
  });
});
