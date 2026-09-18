import { TEST_STANDALONE, TEST_STANDALONE_BROWSER } from "./constants.js";
import getBrowserPrettier from "./get-browser-prettier.js";

function getPrettierInternal() {
  if (TEST_STANDALONE_BROWSER) {
    return getBrowserPrettier();
  }

  const entry = TEST_STANDALONE ? "prettier/standalone" : "prettier";

  return import(entry).then((module) => module.default);
}

let promise;
function getPrettier() {
  promise = promise ?? getPrettierInternal();

  return promise;
}

export default getPrettier;
