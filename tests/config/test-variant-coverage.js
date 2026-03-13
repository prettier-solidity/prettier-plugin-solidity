import getCreateParser from "./get-create-parser.js";
import getVariantCoverage from "./get-variant-coverage.js";

async function testVariantCoverage(testCase) {
  const { code, formatOptions } = testCase;

  if (formatOptions.parser === "slang") {
    const createParser = await getCreateParser();
    const variantCoverage = await getVariantCoverage();
    const { parseOutput } = createParser(code, formatOptions);

    // Check coverage
    variantCoverage(parseOutput.tree.asNonterminalNode());
  }
}

export { testVariantCoverage as run };
