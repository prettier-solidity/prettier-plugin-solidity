import getCreateParser from "./get-create-parser.js";
import getVariantCoverage from "./get-variant-coverage.js";

async function testVariantCoverage(
  source,
  _formatResult,
  _filename,
  formatOptions,
) {
  if (formatOptions.parser === "slang") {
    const createParser = await getCreateParser();
    const variantCoverage = await getVariantCoverage();
    const { parseOutput } = createParser(source, formatOptions);

    // Check coverage
    variantCoverage(parseOutput.tree.asNonterminalNode());
  }
}

export { testVariantCoverage as run };
