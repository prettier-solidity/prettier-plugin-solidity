import path from "node:path";
import createEsmUtils from "esm-utils";
import { BOM, FULL_TEST } from "./constants.js";
import * as failedTests from "./failed-format-tests.js";
import { format } from "./run-prettier.js";
import consistentEndOfLine from "./utils/consistent-end-of-line.js";
import createSnapshot from "./utils/create-snapshot.js";
import visualizeEndOfLine from "./utils/visualize-end-of-line.js";
import * as testAstCompare from "./test-ast-compare.js";
import * as testSecondFormat from "./test-second-format.js";
import { shouldThrowOnFormat } from "./utilities.js";
import getPrettier from "./get-prettier.js";
import getCreateParser from "./get-create-parser.js";
import getVariantCoverage from "./get-variant-coverage.js";
import getPlugins from "./get-plugins.js";
import compileContract from "./utils/compile-contract.js";

const { __dirname } = createEsmUtils(import.meta);

const testsWithAstChanges = new Map(
  [
    "Parentheses/AddNoParentheses.sol",
    "Parentheses/SubNoParentheses.sol",
    "Parentheses/MulNoParentheses.sol",
    "Parentheses/DivNoParentheses.sol",
    "Parentheses/ModNoParentheses.sol",
    "Parentheses/ExpNoParentheses.sol",
    "Parentheses/ShiftLNoParentheses.sol",
    "Parentheses/ShiftRNoParentheses.sol",
    "Parentheses/BitAndNoParentheses.sol",
    "Parentheses/BitOrNoParentheses.sol",
    "Parentheses/BitXorNoParentheses.sol",
    "Parentheses/LogicNoParentheses.sol",
    "HexLiteral/HexLiteral.sol",
    "ModifierInvocations/ModifierInvocations.sol",
  ].map((fixture) => {
    const [file, compareBytecode = () => true] = Array.isArray(fixture)
      ? fixture
      : [fixture];
    return [path.join(__dirname, "../format/", file), compareBytecode];
  }),
);

const shouldCompareBytecode = (filename, options) => {
  const testFunction = testsWithAstChanges.get(filename);

  if (!testFunction) {
    return false;
  }

  return testFunction(options);
};

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
    const variantCoverage = await getVariantCoverage();
    const { parser, parseOutput } = createParser(code, formatOptions);

    // Check coverage
    variantCoverage(parseOutput.tree.asNonterminalNode());

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

  await testSecondFormat.run(code, formatResult, filename, formatOptions);
  await testAstCompare.run(code, formatResult, filename, formatOptions);

  if (!shouldSkipEolTest(code, formatResult.options)) {
    for (const eol of ["\r\n", "\r"]) {
      const { eolVisualizedOutput: output } = await format(
        code.replace(/\n/gu, eol),
        formatOptions,
      );
      // Only if `endOfLine: "auto"` the result will be different
      const expected =
        formatOptions.endOfLine === "auto"
          ? visualizeEndOfLine(
              // All `code` use `LF`, so the `eol` of result is always `LF`
              formatResult.outputWithCursor.replace(/\n/gu, eol),
            )
          : formatResult.eolVisualizedOutput;
      expect(output).toEqual(expected);
    }
  }

  if (code.charAt(0) !== BOM) {
    const { eolVisualizedOutput: output } = await format(
      BOM + code,
      formatOptions,
    );
    const expected = BOM + formatResult.eolVisualizedOutput;
    expect(output).toEqual(expected);
  }

  if (shouldCompareBytecode(filename, formatOptions)) {
    const output = compileContract(filename, formatResult.output);
    const expected = compileContract(filename, formatResult.input);
    expect(output).toEqual(expected);
  }
}

function shouldSkipEolTest(code, options) {
  if (code.includes("\r")) {
    return true;
  }
  const { requirePragma, rangeStart, rangeEnd } = options;
  if (requirePragma) {
    return true;
  }

  if (
    typeof rangeStart === "number" &&
    typeof rangeEnd === "number" &&
    rangeStart >= rangeEnd
  ) {
    return true;
  }
  return false;
}

export { runTest };
