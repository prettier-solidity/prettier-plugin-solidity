import fs from "node:fs";
import path from "node:path";
import { FORMAT_SCRIPT_FILENAME } from "./constants.js";

function getFixtures(context) {
  return [...getFiles(context), ...getSnippets(context)];
}

function getFiles({ dirname }) {
  return fs
    .readdirSync(dirname, { withFileTypes: true })
    .map((file) => {
      const basename = file.name;
      const filename = path.join(dirname, basename);
      if (
        path.extname(basename) === ".snap" ||
        !file.isFile() ||
        basename[0] === "." ||
        basename === FORMAT_SCRIPT_FILENAME ||
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
}

function getSnippets({ snippets }) {
  return snippets.map((test, index) => {
    test = typeof test === "string" ? { code: test } : test;

    if (typeof test.code !== "string") {
      throw Object.assign(new Error("Invalid test"), { test });
    }

    return {
      ...test,
      name: `snippet: ${test.name || `#${index}`}`,
    };
  });
}

export { getFixtures };
