import { BOM } from "./constants.js";
import { format } from "./run-prettier.js";

async function testBom(source, formatResult, _filename, formatOptions) {
  if (source.charAt(0) !== BOM) {
    const { eolVisualizedOutput: output } = await format(
      BOM + source,
      formatOptions,
    );
    const expected = BOM + formatResult.eolVisualizedOutput;
    expect(output).toEqual(expected);
  }
}

export { testBom as run };
