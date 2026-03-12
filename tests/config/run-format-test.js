import path from "node:path";
import url from "node:url";
import { FORMAT_SCRIPT_FILENAME } from "./constants.js";
import { getFixtures } from "./get-fixtures.js";
import { stringifyOptionsForTitle } from "./utils/stringify-options-for-title.js";
import {
  isErrorTest as isErrorTestDirectory,
  normalizeDirectory,
} from "./utilities.js";
import { format } from "./run-prettier.js";
import { replacePlaceholders } from "./replace-placeholders.js";
import { runTest } from "./run-test.js";
import { shouldThrowOnFormat } from "./utilities.js";

function runFormatTest(rawFixtures, explicitParsers, rawOptions) {
  const { importMeta, snippets = [] } = rawFixtures.importMeta
    ? rawFixtures
    : { importMeta: rawFixtures };

  const filename = path.basename(new URL(importMeta.url).pathname);
  if (filename !== FORMAT_SCRIPT_FILENAME) {
    throw new Error(
      `Format test should run in file named '${FORMAT_SCRIPT_FILENAME}'.`,
    );
  }

  const dirname = normalizeDirectory(
    path.dirname(url.fileURLToPath(importMeta.url)),
  );

  let options = { ...rawOptions };

  // `IS_ERROR_TEST` mean to watch errors like:
  // - syntax parser hasn't supported yet
  // - syntax errors that should throws
  const isErrorTest = isErrorTestDirectory(dirname);

  if (isErrorTest) {
    options = { errors: true, ...options };
  }

  const context = {
    dirname,
    stringifiedOptions: stringifyOptionsForTitle(rawOptions),
    parsers: [...explicitParsers],
    options,
    explicitParsers,
    rawOptions,
    snippets,
  };

  for (const fixture of getFixtures(context)) {
    const { name, context, filepath } = fixture;
    const { stringifiedOptions, parsers } = context;

    const title = `${name}${
      stringifiedOptions ? ` - ${stringifiedOptions}` : ""
    }`;

    describe(title, () => {
      const testCases = parsers.map((parser) => getTestCase(fixture, parser));

      for (const testCase of testCases) {
        const testTitle =
          testCase.expectFail ||
          testCase.formatOptions.parser !== testCase.parser
            ? `[${testCase.parser}] format`
            : "format";

        test(testTitle, async () => {
          await runTest({
            parsers,
            name,
            filename: filepath,
            code: testCase.code,
            output: testCase.expectedOutput,
            parser: testCase.parser,
            mainParserFormatResult: await testCase.runFormat(),
            mainParserFormatOptions: testCase.formatOptions,
          });
        });
      }
    });
  }
}

function getTestCase(fixture, parser) {
  const { code: originalText, context, filepath } = fixture;

  const { text: code, options: formatOptions } = replacePlaceholders(
    originalText,
    {
      printWidth: 80,
      ...context.options,
      filepath,
      parser,
    },
  );

  const expectFail = shouldThrowOnFormat(fixture, formatOptions);

  let promise;

  return {
    context,
    parser,
    filepath,
    originalText,
    code,
    formatOptions,
    expectFail,
    expectedOutput: fixture.output,
    isEmpty: code.trim() === "",
    runFormat: () =>
      promise === undefined ? (promise = format(code, formatOptions)) : promise,
  };
}

export default runFormatTest;
