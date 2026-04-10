import * as failedTests from "./failed-format-tests.js";
import { parse } from "./run-prettier.js";

async function testAstCompare(testCase) {
  const { code, filepath, formatOptions } = testCase;
  const formatResult = await testCase.runFormat();

  const isAstUnstableTest = failedTests.isAstUnstable(filepath, formatOptions);
  // Some parsers skip parsing empty files
  if (formatResult.changed && code.trim()) {
    const [originalAst, formattedAst] = await Promise.all(
      [formatResult.input, formatResult.output].map((code) =>
        parse(code, formatResult.options),
      ),
    );
    if (isAstUnstableTest) {
      expect(formattedAst).not.toEqual(originalAst);
    } else {
      expect(formattedAst).toEqual(originalAst);
    }
  }
}

export { testAstCompare as run };
