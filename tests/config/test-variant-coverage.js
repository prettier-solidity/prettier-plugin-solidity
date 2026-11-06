import getInferAndParse from "./get-infer-and-parse.js";
import getVariantCoverage from "./get-variant-coverage.js";

/**
@import {TestCase} from "./run-test.js"
*/

/**
@param {TestCase} testCase
@param {string} name
*/
function testVariantCoverage(testCase, name) {
  test(name, async () => {
    const { code, formatOptions } = testCase;

    const inferAndParse = await getInferAndParse();
    const variantCoverage = await getVariantCoverage();
    const { parseOutput } = inferAndParse(code, formatOptions);

    // Check coverage
    variantCoverage(parseOutput.tree.asNonterminalNode());
  });
}

/**
@param {TestCase} testCase
@return {boolean}
*/
function shouldSkip(testCase) {
  return testCase.expectFail;
}

export { testVariantCoverage as run, shouldSkip as skip };
