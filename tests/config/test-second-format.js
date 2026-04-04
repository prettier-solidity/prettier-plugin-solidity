import * as failedTests from "./failed-format-tests.js";
import { format } from "./run-prettier.js";

async function testSecondFormat(source, formatResult, filename, formatOptions) {
  const isUnstableTest = failedTests.isUnstable(filename, formatOptions);
  if (
    (formatResult.changed || isUnstableTest) &&
    // No range and cursor
    formatResult.input === source
  ) {
    const { eolVisualizedOutput: firstOutput, output } = formatResult;
    const { eolVisualizedOutput: secondOutput } = await format(
      output,
      formatOptions,
    );
    // To keep eye on failed tests, this assert never supposed to pass,
    // if it fails, just remove the file from `unstableTests`
    if (isUnstableTest) {
      expect(secondOutput).not.toEqual(firstOutput);
      return;
    }

    expect(secondOutput).toEqual(firstOutput);
  }
}

export { testSecondFormat as run };
