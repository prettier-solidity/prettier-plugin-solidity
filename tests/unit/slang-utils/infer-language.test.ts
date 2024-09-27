import { Language } from "@nomicfoundation/slang/language/index.js";
import { inferLanguage } from "../../../src/slang-utils/infer-language.js"

describe("inferLanguage", function () {
    const fixtures = [
        { description: "Caret range", source: `pragma solidity ^0.7.0;`, version: "0.7.6" },
        { description: "Pinned version", source: `pragma solidity 0.8.1;`, version: "0.8.1" },
        { description: "Caret range and pinned version", source: `pragma solidity ^0.8.0; pragma solidity 0.8.2;`, version: "0.8.2" },
        { description: "With multiline comment before the range", source: `pragma solidity /* comment */ 0.8.2;`, version: "0.8.2" },
        { description: "With natspec comment before the range", source: `pragma solidity /** comment */ 0.8.2;`, version: "0.8.2" },
        { description: "With multiline comment after the range", source: `pragma solidity 0.8.2 /* comment */;`, version: "0.8.2" },
        { description: "With natspec comment after the range", source: `pragma solidity 0.8.2 /** comment */;`, version: "0.8.2" },
        { description: "With tracing line comment", source: `pragma solidity 0.8.2; // line comment`, version: "0.8.2" },
    ]

    for (const { description, source, version } of fixtures) {
        test(description, function () {
            const inferredLanguage = inferLanguage(source);
            expect(inferredLanguage.version).toEqual(version);
        })
    }

    test("should use the latest version if the source has no pragmas", function () {
        const supportedVersions = Language.supportedVersions();
        const latestSupportedVersion = supportedVersions[supportedVersions.length - 1];
        const inferredLanguage = inferLanguage(`contract Foo {}`);
        expect(inferredLanguage.version).toEqual(latestSupportedVersion);
    })

    test.skip('should throw an error if there are incompatible ranges', function () {
        expect(() => inferLanguage(`pragma solidity ^0.8.0; pragma solidity 0.7.6;`)).toThrow();
    })
})