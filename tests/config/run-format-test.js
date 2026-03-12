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

  const [parser] = explicitParsers;
  const allParsers = [...explicitParsers];

  const context = {
    dirname,
    stringifiedOptions: stringifyOptionsForTitle(rawOptions),
    parsers: allParsers,
    options,
    explicitParsers,
    rawOptions,
    snippets,
  };

  for (const { name, filename, code, output } of getFixtures(context)) {
    const title = `${name}${
      context.stringifiedOptions ? ` - ${context.stringifiedOptions}` : ""
    }`;

    describe(title, () => {
      const formatOptions = {
        printWidth: 80,
        ...options,
        filepath: filename,
        parser,
      };
      const shouldThrowOnMainParserFormat = shouldThrowOnFormat(
        name,
        formatOptions,
      );

      let mainParserFormatResult;
      if (shouldThrowOnMainParserFormat) {
        mainParserFormatResult = { options: formatOptions, error: true };
      } else {
        beforeAll(async () => {
          mainParserFormatResult = await format(code, formatOptions);
        });
      }

      for (const currentParser of allParsers) {
        const testTitle =
          shouldThrowOnMainParserFormat ||
          formatOptions.parser !== currentParser
            ? `[${currentParser}] format`
            : "format";

        test(testTitle, async () => {
          await runTest({
            parsers: explicitParsers,
            name,
            filename,
            code,
            output,
            parser: currentParser,
            mainParserFormatResult,
            mainParserFormatOptions: formatOptions,
          });
        });
      }
    });
  }
}

export default runFormatTest;
