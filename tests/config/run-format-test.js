import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { FORMAT_SCRIPT_FILENAME } from "./constants.js";
import { stringifyOptionsForTitle } from "./utils/stringify-options-for-title.js";
import {
  isErrorTest as isErrorTestDirectory,
  normalizeDirectory,
} from "./utilities.js";
import { format } from "./run-prettier.js";
import { runTest } from "./run-test.js";
import { shouldThrowOnFormat } from "./utilities.js";

function runFormatTest(rawFixtures, explicitParsers, rawOptions) {
  let { importMeta, snippets = [] } = rawFixtures.importMeta
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

  snippets = snippets.map((test, index) => {
    test = typeof test === "string" ? { code: test } : test;

    if (typeof test.code !== "string") {
      throw Object.assign(new Error("Invalid test"), { test });
    }

    return {
      ...test,
      name: `snippet: ${test.name || `#${index}`}`,
    };
  });

  const files = fs
    .readdirSync(dirname, { withFileTypes: true })
    .map((file) => {
      const basename = file.name;
      const filename = path.join(dirname, basename);
      if (
        path.extname(basename) === ".snap" ||
        !file.isFile() ||
        basename[0] === "." ||
        basename === "format.test.js" ||
        // VSCode creates this file sometime https://github.com/microsoft/vscode/issues/105191
        basename === "debug.log"
      ) {
        return;
      }

      const text = fs.readFileSync(filename, "utf8");

      return {
        name: basename,
        filename,
        code: text,
      };
    })
    .filter(Boolean);

  const [parser] = explicitParsers;
  const allParsers = [...explicitParsers];

  const stringifiedOptions = stringifyOptionsForTitle(options);

  for (const { name, filename, code, output } of [...files, ...snippets]) {
    const title = `${name}${
      stringifiedOptions ? ` - ${stringifiedOptions}` : ""
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
