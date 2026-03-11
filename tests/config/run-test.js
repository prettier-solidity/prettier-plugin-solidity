import { FULL_TEST } from "./constants.js";
import * as failedTests from "./failed-format-tests.js";
import { format } from "./run-prettier.js";
import consistentEndOfLine from "./utils/consistent-end-of-line.js";
import createSnapshot from "./utils/create-snapshot.js";
import visualizeEndOfLine from "./utils/visualize-end-of-line.js";
import * as testAstCompare from "./test-ast-compare.js";
import * as testBom from "./test-bom.js";
import * as testEndOfLine from "./test-end-of-line.js";
import * as testSecondFormat from "./test-second-format.js";
import * as testBytecodeCompare from "./test-bytecode-compare.js";
import * as testVariantCoverage from "./test-variant-coverage.js";
import { shouldThrowOnFormat } from "./utilities.js";
import getPrettier from "./get-prettier.js";
import getCreateParser from "./get-create-parser.js";
import getPlugins from "./get-plugins.js";

async function runTest({
  parsers,
  name,
  filename,
  code,
  output,
  parser,
  mainParserFormatResult,
  mainParserFormatOptions,
}) {
  let formatOptions = mainParserFormatOptions;
  let formatResult = mainParserFormatResult;

  // Verify parsers or error tests
  if (
    mainParserFormatResult.error ||
    mainParserFormatOptions.parser !== parser
  ) {
    formatOptions = { ...mainParserFormatResult.options, parser };
    const runFormat = () => format(code, formatOptions);

    if (shouldThrowOnFormat(name, formatOptions)) {
      await expect(runFormat()).rejects.toThrowErrorMatchingSnapshot();
      return;
    }

    // Verify parsers format result should be the same as main parser
    output = mainParserFormatResult.outputWithCursor;
    formatResult = await runFormat();
  }

  // Make sure output has consistent EOL
  expect(formatResult.eolVisualizedOutput).toEqual(
    visualizeEndOfLine(consistentEndOfLine(formatResult.outputWithCursor)),
  );

  // The result is assert to equals to `output`
  if (typeof output === "string") {
    expect(formatResult.eolVisualizedOutput).toEqual(
      visualizeEndOfLine(output),
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

  if (formatOptions.parser === "slang") {
    const createParser = await getCreateParser();
    const { parser } = createParser(code, formatOptions);

    if (!failedTests.isAntlrMismatch(filename, formatOptions)) {
      // Compare with ANTLR's format
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

  await testVariantCoverage.run(code, formatResult, filename, formatOptions);
  await testSecondFormat.run(code, formatResult, filename, formatOptions);
  await testAstCompare.run(code, formatResult, filename, formatOptions);
  await testEndOfLine.run(code, formatResult, filename, formatOptions, "\r\n");
  await testEndOfLine.run(code, formatResult, filename, formatOptions, "\r");
  await testBom.run(code, formatResult, filename, formatOptions);
  await testBytecodeCompare.run(code, formatResult, filename, formatOptions);
}

export { runTest };
