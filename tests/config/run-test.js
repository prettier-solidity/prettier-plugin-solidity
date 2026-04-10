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

    for (const testCase of testCases) {
      const testTitle =
        testCase.expectFail || testCase.formatOptions.parser !== testCase.parser
          ? `[${testCase.parser}] format`
          : "format";

      test(testTitle, async () => {
        await testFormat.run(testCase);

        if (!FULL_TEST) {
          return;
        }
        await Promise.all(
          [
            testAntlrFormat.run,
            testVariantCoverage.run,
            testSecondFormat.run,
            testAstCompare.run,
            testBom.run,
            testBytecodeCompare.run,
          ]
            .map((test) => test(testCase))
            .join(
              ["\r\n", "\r"].map((eol) => testEndOfLine.run(testCase, eol)),
            ),
        );
      });
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
