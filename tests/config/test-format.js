import consistentEndOfLine from "./utils/consistent-end-of-line.js";
import createSnapshot from "./utils/create-snapshot.js";
import visualizeEndOfLine from "./utils/visualize-end-of-line.js";

async function testFormat(testCase) {
  const { code, parser, expectedOutput, formatOptions } = testCase;
  const formatResult = await testCase.runFormat();

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
    visualizeEndOfLine(consistentEndOfLine(formatResult.outputWithCursor)),
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
    createSnapshot(formatResult, {
      parsers: testCase.context.parsers,
      formatOptions,
    }),
  ).toMatchSnapshot();
}

export { testFormat as run };
