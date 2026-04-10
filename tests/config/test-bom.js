import { BOM } from "./constants.js";
import { format } from "./run-prettier.js";

async function testBom(testCase) {
  const { code, formatOptions } = testCase;
  const formatResult = await testCase.runFormat();

  if (code.charAt(0) !== BOM) {
    const { eolVisualizedOutput: output } = await format(
      BOM + code,
      formatOptions,
    );
    const expected = BOM + formatResult.eolVisualizedOutput;
    expect(output).toEqual(expected);
  }
}

export { testBom as run };
