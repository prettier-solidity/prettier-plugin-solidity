import path from "node:path";
import { createRequire } from "node:module";

function getPrettierInternal() {
  const require = createRequire(import.meta.url);

  const entry = process.env.TEST_STANDALONE
    ? path.join(path.dirname(require.resolve("prettier")), "standalone.js")
    : "prettier";

  return import(entry).then((module) => module.default);
}

let promise;
function getPrettier() {
  promise = promise ?? getPrettierInternal();

  return promise;
}

export default getPrettier;
