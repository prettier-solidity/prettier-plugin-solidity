import { FULL_TEST } from "./constants.js";
import { replacePlaceholders } from "./replace-placeholders.js";
import { format } from "./run-prettier.js";
import * as testAstCompare from "./test-ast-compare.js";
import * as testBom from "./test-bom.js";
import * as testEndOfLine from "./test-end-of-line.js";
import * as testFormat from "./test-format.js";
import * as testSecondFormat from "./test-second-format.js";
import * as testBytecodeCompare from "./test-bytecode-compare.js";
import * as testAntlrFormat from "./test-antlr-format.js";
import * as testVariantCoverage from "./test-variant-coverage.js";
import { shouldThrowOnFormat } from "./utilities.js";

async function testFixture(fixture) {
  const { name, context } = fixture;
  const { stringifiedOptions, parsers } = context;

  const title = `${name}${
    stringifiedOptions ? ` - ${stringifiedOptions}` : ""
  }`;

  describe(title, () => {
    const testCases = parsers.map((parser) => getTestCase(fixture, parser));

    const testCaseForSnapshot = testCases.find(
      (testCase) =>
        !testCase.expectFail && typeof testCase.expectedOutput !== "string",
    );

    const hasMultipleParsers = testCases.length > 1;

    for (const functionality of [
      {
        name(testCase) {
          let name = "format";
          // Avoid parser display in snapshot
          if (testCaseForSnapshot !== testCase && hasMultipleParsers) {
            name += `[${testCase.parser}]`;
          }
          return name;
        },
        test: {
          run: (testCase) => testFormat.run(testCase, testCaseForSnapshot),
        },
      },
      {
        name: "ast compare",
        test: { run: testAstCompare.run },
        skip: () => !FULL_TEST,
      },
      // The following cases only need run on main parser
      {
        name: "second format",
        test: { run: testSecondFormat.run },
        skip: (testCase) => !FULL_TEST || testCase !== testCaseForSnapshot,
      },
      {
        name: "end of line (CRLF)",
        test: { run: (testCase) => testEndOfLine.run(testCase, "\r\n") },
        skip: (testCase) => !FULL_TEST || testCase !== testCaseForSnapshot,
      },
      {
        name: "end of line (CR)",
        test: { run: (testCase) => testEndOfLine.run(testCase, "\r") },
        skip: (testCase) => !FULL_TEST || testCase !== testCaseForSnapshot,
      },
      {
        name: "BOM",
        test: { run: testBom.run },
        skip: (testCase) => !FULL_TEST || testCase !== testCaseForSnapshot,
      },
      {
        name: "ANTLR format",
        test: { run: testAntlrFormat.run },
        skip: (testCase) => !FULL_TEST || testCase !== testCaseForSnapshot,
      },
      {
        name: "bytecode comparison",
        test: { run: testBytecodeCompare.run },
        skip: (testCase) => !FULL_TEST || testCase !== testCaseForSnapshot,
      },
      {
        name: "variant coverage",
        test: { run: testVariantCoverage.run },
        skip: (testCase) => !FULL_TEST || testCase !== testCaseForSnapshot,
      },
    ]) {
      for (const testCase of testCases) {
        if (functionality.skip?.(testCase)) {
          continue;
        }
        let { name } = functionality;
        if (typeof name === "function") {
          name = name(testCase);
        } else if (hasMultipleParsers) {
          name += ` [${testCase.parser}]`;
        }
        test(name, async () => {
          await functionality.test.run(testCase);
        });
      }
    }
  });
}

function getTestCase(fixture, parser) {
  const { code: originalText, context, filepath } = fixture;

  const { text: code, options: formatOptions } = replacePlaceholders(
    originalText,
    {
      printWidth: 80,
      ...context.options,
      filepath,
      parser,
    },
  );

  const expectFail = shouldThrowOnFormat(fixture, formatOptions);

  let promise;

  return {
    context,
    parser,
    filepath,
    originalText,
    code,
    formatOptions,
    expectFail,
    expectedOutput: fixture.output,
    isEmpty: code.trim() === "",
    runFormat: () =>
      promise === undefined ? (promise = format(code, formatOptions)) : promise,
  };
}

export { testFixture };
