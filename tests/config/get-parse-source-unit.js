import { TEST_STANDALONE } from "./constants.js";

function getParseSourceUnitInternal() {
  const entry = TEST_STANDALONE
    ? "../../dist/parse-source-unit.js"
    : "../../src/slang-utils/parse-source-unit.ts";

  return import(entry).then((module) => module.parseSourceUnit);
}

let promise;
function getParseSourceUnit() {
  promise = promise ?? getParseSourceUnitInternal();

  return promise;
}

export default getParseSourceUnit;
