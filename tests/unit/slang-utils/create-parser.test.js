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
      source: `pragma solidity ^10.0.0;`,
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

    // ({ parser } = createParser(`contract Foo {byte bar;}`, options));
    // expect(parser.languageVersion).toEqual('0.7.6');
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

    ({ parser } = createParser(`pragma solidity ^0.7.0;`, {}));
    expect(parser.languageVersion).toEqual('0.7.6');
  });

  test('should throw if compiler option does not match the syntax', function () {
    expect(() =>
      createParser(`contract Foo {byte bar;}`, { compiler: '0.8.0' })
    ).toThrow(
      'Based on the compiler option provided, we inferred your code to be using Solidity version'
    );
  });

  test('should throw if pragma is outside the supported version and the syntax does not match with the latest supported version', function () {
    expect(() =>
      createParser(`pragma solidity 10.0.0;contract Foo {byte bar;}`, options)
    ).toThrow(
      "We couldn't infer a Solidity version based on the pragma statements"
    );
  });

  test('should throw if there is no pragma and the syntax does not match with the latest supported version', function () {
    expect(() => createParser(`contract Foo {byte bar;}`, options)).toThrow(
      "We couldn't infer a Solidity version based on the pragma statements"
    );
  });

  test('should throw an error if there are incompatible ranges and the syntax does not match with the latest supported version', function () {
    expect(() =>
      createParser(
        `pragma solidity ^0.8.0; pragma solidity 0.7.6;contract Foo {byte bar;}`,
        options
      )
    ).toThrow(
      "We couldn't infer a Solidity version based on the pragma statements"
    );
  });

  test('should throw an error if the pragma statement is and the syntax do not match', function () {
    expect(() =>
      createParser(`pragma solidity ^0.8.0;contract Foo {byte bar;}`, options)
    ).toThrow(
      'Based on the pragma statements, we inferred your code to be using Solidity version'
    );
  });
});
