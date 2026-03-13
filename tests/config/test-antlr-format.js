import * as failedTests from "./failed-format-tests.js";
import getPrettier from "./get-prettier.js";
import getCreateParser from "./get-create-parser.js";
import getPlugins from "./get-plugins.js";

async function testAntlrFormat(testCase) {
  const { code, filepath, formatOptions } = testCase;
  const formatResult = await testCase.runFormat();

  if (
    formatOptions.parser === "slang" &&
    !failedTests.isAntlrMismatch(filepath, formatOptions)
  ) {
    // Compare with ANTLR's format
    const createParser = await getCreateParser();
    const { parser } = createParser(code, formatOptions);
    const prettier = await getPrettier();
    const { formatted: antlrOutput } = await prettier.formatWithCursor(code, {
      ...formatOptions,
      // Since Slang forces us to decide on a compiler version, we need to do the
      // same for ANTLR unless it was already given as an option.
      compiler: formatOptions.compiler || parser.languageVersion,
      parser: "antlr",
      plugins: await getPlugins(),
    });
    expect(antlrOutput).toEqual(formatResult.output);
  }
}

export { testAntlrFormat as run };
