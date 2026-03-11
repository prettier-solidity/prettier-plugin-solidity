import { format } from "./run-prettier.js";
import visualizeEndOfLine from "./utils/visualize-end-of-line.js";

async function testEndOfLine(
  source,
  formatResult,
  _filename,
  formatOptions,
  eol,
) {
  if (!shouldSkipEolTest(source, formatResult.options)) {
    const { eolVisualizedOutput: output } = await format(
      source.replace(/\n/gu, eol),
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

function shouldSkipEolTest(source, options) {
  if (source.includes("\r")) {
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

export { testEndOfLine as run };
