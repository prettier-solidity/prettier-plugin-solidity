import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import createEsmUtils from "esm-utils";
import { stringifyOptionsForTitle } from "./utils/stringify-options-for-title.js";
import { format } from "./run-prettier.js";
import { runTest } from "./run-test.js";
import { shouldThrowOnFormat } from "./utilities.js";

const { __dirname } = createEsmUtils(import.meta);

const isTestDirectory = (dirname, name) =>
  (dirname + path.sep).startsWith(
    path.join(__dirname, "../format", name) + path.sep,
  );

function runFormatTest(fixtures, parsers, options) {
  let { importMeta, snippets = [] } = fixtures.importMeta
    ? fixtures
    : { importMeta: fixtures };

  const filename = path.basename(new URL(importMeta.url).pathname);
  if (filename !== "format.test.js") {
    throw new Error(`Format test should run in file named 'format.test.js'.`);
  }

  const dirname = path.dirname(url.fileURLToPath(importMeta.url));

  // `IS_PARSER_INFERENCE_TESTS` mean to test `inferParser` on `standalone`
  const IS_PARSER_INFERENCE_TESTS = isTestDirectory(
    dirname,
    "misc/parser-inference",
  );

  // `IS_ERROR_TESTS` mean to watch errors like:
  // - syntax parser hasn't supported yet
  // - syntax errors that should throws
  const IS_ERROR_TESTS = isTestDirectory(dirname, "misc/errors");
  if (IS_ERROR_TESTS) {
    options = { errors: true, ...options };
  }

  if (IS_PARSER_INFERENCE_TESTS) {
    parsers = [undefined];
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

  const [parser] = parsers;
  const allParsers = [...parsers];

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
            parsers,
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
