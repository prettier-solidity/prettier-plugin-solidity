import { FULL_TEST } from "./constants.js";
import { replacePlaceholders } from "./replace-placeholders.js";
import { format } from "./run-prettier.js";
import consistentEndOfLine from "./utils/consistent-end-of-line.js";
import createSnapshot from "./utils/create-snapshot.js";
import visualizeEndOfLine from "./utils/visualize-end-of-line.js";
import * as testAstCompare from "./test-ast-compare.js";
import * as testBom from "./test-bom.js";
import * as testEndOfLine from "./test-end-of-line.js";
import * as testSecondFormat from "./test-second-format.js";
import * as testBytecodeCompare from "./test-bytecode-compare.js";
import * as testAntlrFormat from "./test-antlr-format.js";
import * as testVariantCoverage from "./test-variant-coverage.js";
import { shouldThrowOnFormat } from "./utilities.js";

async function testFixture(fixture) {
  const { name, context, filepath } = fixture;
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
        let { code, expectedOutput, parser, formatOptions } = testCase;
        let formatResult = await testCase.runFormat();

        // Verify parsers or error tests
        if (formatOptions.parser !== parser) {
          const runFormat = () => format(code, formatOptions);

          if (shouldThrowOnFormat(name, formatOptions)) {
            await expect(runFormat()).rejects.toThrowErrorMatchingSnapshot();
            return;
          }

          // Verify parsers format result should be the same as main parser
          output = formatResult.outputWithCursor;
          formatResult = await runFormat();
        }

        // Make sure output has consistent EOL
        expect(formatResult.eolVisualizedOutput).toEqual(
          visualizeEndOfLine(
            consistentEndOfLine(formatResult.outputWithCursor),
          ),
        );

        // The result is assert to equals to `expectedOutput`
        if (typeof expectedOutput === "string") {
          expect(formatResult.eolVisualizedOutput).toEqual(
            visualizeEndOfLine(expectedOutput),
          );
          return;
        }

        // All parsers have the same result, only snapshot the result from main parser
        expect(
          createSnapshot(formatResult, { parsers, formatOptions }),
        ).toMatchSnapshot();

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
            .map((test) => test(code, formatResult, filepath, formatOptions))
            .join(
              ["\r\n", "\r"].map((eol) =>
                testEndOfLine.run(
                  code,
                  formatResult,
                  filepath,
                  formatOptions,
                  eol,
                ),
              ),
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
