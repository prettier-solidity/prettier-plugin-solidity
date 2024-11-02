import { Parser } from '@nomicfoundation/slang/parser';
import { createParser } from '../../../src/slang-utils/create-parser.js';

describe('inferLanguage', function () {
  const supportedVersions = Parser.supportedVersions();
  const latestSupportedVersion =
    supportedVersions[supportedVersions.length - 1];

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
      description: 'should use the latest version if the source has no pragmas',
      source: `contract Foo {}`,
      version: latestSupportedVersion
    },
    {
      description:
        'should use the latest valid version if the source has no pragmas and the syntax is old',
      source: `contract Foo {byte bar;}`,
      version: '0.7.6'
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
      const parser = createParser(source);
      expect(parser.version).toEqual(version);
    });
  }

  test.skip('should throw an error if there are incompatible ranges', function () {
    expect(() =>
      createParser(`pragma solidity ^0.8.0; pragma solidity 0.7.6;`)
    ).toThrow();
  });
});
