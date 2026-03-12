import path from "node:path";
import url from "node:url";
import { FORMAT_SCRIPT_FILENAME } from "./constants.js";
import { getFixtures } from "./get-fixtures.js";
import { testFixture } from "./run-test.js";
import { stringifyOptionsForTitle } from "./utils/stringify-options-for-title.js";
import {
  isErrorTest as isErrorTestDirectory,
  normalizeDirectory,
} from "./utilities.js";

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
    testFixture(fixture);
  }
}

export default runFormatTest;
